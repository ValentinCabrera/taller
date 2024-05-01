import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function Estadisticas() {
    // Datos de ejemplo

    const data = [
        { name: 'Enero', cantidad: 30 },
        { name: 'Febrero', cantidad: 50 },
        { name: 'Marzo', cantidad: 40 },
        { name: 'Abril', cantidad: 70 },
        { name: 'Mayo', cantidad: 60 },
    ];

    return (
        <div style={{ width: '100%', height: 400 }}>
            <ResponsiveContainer>
                <BarChart
                    data={data}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="cantidad" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};
