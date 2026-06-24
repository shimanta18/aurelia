'use client';

import React, { useEffect, useState } from 'react';
import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from 'recharts';

interface AnalyticalDataPoint {
    name: string;
    value?: number;
    items?: number;
    propertiesAdded?: number;
}

interface DistributionDataPoint {
    name: string;
    value: number;
}

interface OverviewStats {
    totalItems: number;
    totalUsers: number;
    revenue: number;
    activityCount: number;
}

export default function DashboardOverview(): React.JSX.Element {
    const [userRole, setUserRole] = useState<string | null>(null);
    const [userName, setUserName] = useState<string>('Member');
    const [stats, setStats] = useState<OverviewStats>({ totalItems: 0, totalUsers: 0, revenue: 0, activityCount: 0 });
    const [chartData, setChartData] = useState<AnalyticalDataPoint[]>([]);
    const [pieData, setPieData] = useState<DistributionDataPoint[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                const parsed = JSON.parse(storedUser);
                setUserRole(parsed.role);
                setUserName(parsed.name || 'Member');
            } catch (err) {
                console.error("Error reading user context", err);
            }
        }

        const fetchDashboardPayload = async () => {
            const token = localStorage.getItem('token');
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/dashboard/overview`, {
                    headers: { 
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json' 
                    }
                });
                const json = await res.json();
                
                if (json.success && json.charts) {
                    setStats({
                        totalItems: json.summary?.totalProperties || 0,
                        totalUsers: json.summary?.totalUsers || 0,
                        revenue: json.summary?.portfolioValueAED || 0,
                        activityCount: json.summary?.totalMessages || 0
                    });
                    
                    // 🌟 CRITICAL FIX: Safe fallbacks prevent Recharts from crashing if backend payload keys vary
                    setChartData(json.charts.lineChartMonthlyData || []);
                    setPieData(json.charts.pieChartData || []);
                }
            } catch (err) {
                console.error("Critical Fetch Error:", err);
            } finally {
                setLoading(false);
            }
        };
        
        fetchDashboardPayload();
    }, []);

    const COLORS = ['#A48463', '#7C654D', '#4A3E31'];

    if (loading) {
        return (
            <div className="flex min-h-[400px] items-center justify-center w-full">
                <div className="w-8 h-8 border-2 border-[#A48463] border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    // Admin Workspace Render View
    if (userRole === 'admin') {
        return (
            <div className="space-y-10 w-full p-2">
                <div>
                    <h1 className="font-serif text-3xl font-normal text-stone-900 tracking-tight">Performance Overview</h1>
                    <p className="text-sm font-sans font-light text-stone-500 mt-1">Real-time system data monitoring analytics grid.</p>
                </div>

                {/* Cards Block */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        { label: 'Total Residences', value: stats.totalItems },
                        { label: 'Registered Clients', value: stats.totalUsers },
                        { label: 'Gross Volume Portfolio', value: `AED ${(stats.revenue / 1000000).toFixed(1)}M` },
                        { label: 'Pending Consultations', value: stats.activityCount }
                    ].map((card, idx) => (
                        <div key={idx} className="bg-white p-6 rounded-xl border border-stone-200/60 shadow-sm">
                            <span className="text-[10px] font-sans font-semibold tracking-wider text-stone-400 uppercase block mb-2">{card.label}</span>
                            <span className="font-serif text-2xl font-normal text-stone-900">{card.value}</span>
                        </div>
                    ))}
                </div>

                {/* Charts Block with Dynamic Key Protection */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-stone-200/60 shadow-sm space-y-10">
                        <div>
                            <h3 className="font-serif text-lg font-normal text-stone-900 mb-4">Capital Generation Tracking (Bar Chart)</h3>
                            <div className="h-64">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={chartData}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#F5F5F5" vertical={false} />
                                        <XAxis dataKey="name" stroke="#A8A29E" fontSize={11} tickLine={false} />
                                        <YAxis stroke="#A8A29E" fontSize={11} tickLine={false} axisLine={false} />
                                        <Tooltip cursor={{ fill: '#FAF7F2' }} />
                                        {/* Fallback support for 'value' or 'propertiesAdded' depending on exact backend matching */}
                                        <Bar dataKey={chartData[0] && 'propertiesAdded' in chartData[0] ? 'propertiesAdded' : 'value'} fill="#A48463" radius={[4, 4, 0, 0]} barSize={40} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>

                    {/* Pie Chart Component Section */}
                    <div className="bg-white p-6 rounded-xl border border-stone-200/60 shadow-sm flex flex-col justify-between">
                        <div>
                            <h3 className="font-serif text-lg font-normal text-stone-900">Portfolio Share Allocation</h3>
                        </div>
                        <div className="h-64 relative flex items-center justify-center my-6">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie data={pieData.length > 0 ? pieData : [{name: "None", value: 1}]} innerRadius={65} outerRadius={85} paddingAngle={4} dataKey="value">
                                        {pieData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="transparent" />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Default Client Hub Renders
    return (
        <div className="max-w-4xl mx-auto space-y-8 mt-4 p-4">
            <h1 className="font-serif text-3xl font-normal text-stone-900">Welcome Back, {userName}</h1>
            <p className="text-sm text-stone-500">Manage your recorded real estate profiles and requested interactions.</p>
        </div>
    );
}