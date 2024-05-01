import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export default function Estadisticas() {
    const data = [
        { tiempoProceso: "140", tiempoFinalizado: "390" },
        { tiempoProceso: "150", tiempoFinalizado: "400" },
        { tiempoProceso: "160", tiempoFinalizado: "410" },
        { tiempoProceso: "170", tiempoFinalizado: "420" },
        { tiempoProceso: "180", tiempoFinalizado: "430" },
        { tiempoProceso: "190", tiempoFinalizado: "440" },
        { tiempoProceso: "200", tiempoFinalizado: "450" },
        { tiempoProceso: "210", tiempoFinalizado: "460" }
    ];

    return (
        <div>
            <div style={{ marginTop: '40px', marginBottom: '20px' }}>
                <LineChart
                    width={1200}
                    height={300}
                    data={data}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="tiempoProceso" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="tiempoProceso" stroke="#8884d8" />
                </LineChart>
            </div>
            <div>
                <LineChart
                    width={1200}
                    height={300}
                    data={data}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="10 10" />
                    <XAxis dataKey="tiempoFinalizado" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="tiempoFinalizado" stroke="#82ca9d" />
                </LineChart>
            </div>
        </div>
    );
};
