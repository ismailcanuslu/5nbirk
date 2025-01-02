import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { apiUrl } from '../../config';
import Loader from '../../shared/components/Loader';
import LinearProgress from '@mui/material/LinearProgress';

const AdminDashboard = () => {
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalArticles, setTotalArticles] = useState(0);
    const [loading, setLoading] = useState(true);
    const [monthlyUserIncrease, setMonthlyUserIncrease] = useState(0);
    const [monthlyArticleIncrease, setMonthlyArticleIncrease] = useState(0);
    const [monthlyTopicIncrease] = useState(0);
    const [visitorsLast30Days] = useState(0);
    const [likesLast30Days] = useState(0);
    const [metrics, setMetrics] = useState({
        memory: { used: 0, total: 1, allocated: 0 },
        disk: { used: 0, total: 1, free: 0 },
        cpu: { load: 0, availableProcessors: 1 },
        uptime: { hours: 0, minutes: 0, seconds: 0 }
    });

    useEffect(() => {
        const fetchCounts = async () => {
            try {
                const usersResponse = await axios.get(`${apiUrl}/api/v1/users/user-count`);
                const articlesResponse = await axios.get(`${apiUrl}/api/v1/blog/post-count`);
                const userMonthlyIncreaseResponse = await axios.get(`${apiUrl}/api/v1/users/user-monthly-increase`);
                const articleMonthlyIncreaseResponse = await axios.get(`${apiUrl}/api/v1/blog/post-monthly-increase`);
                const metricsResponse = await axios.post(`${apiUrl}/metrics/update`);

                setTotalUsers(usersResponse.data);
                setTotalArticles(articlesResponse.data);
                setMonthlyUserIncrease(userMonthlyIncreaseResponse.data);
                setMonthlyArticleIncrease(articleMonthlyIncreaseResponse.data);

                const {
                    "memory.allocated": allocated,
                    "memory.used": used,
                    "memory.total": totalMemory,
                    "disk.used": diskUsed,
                    "disk.total": totalDisk,
                    "disk.free": freeDisk,
                    "cpu.load": cpuLoad,
                    "cpu.availableProcessors": availableProcessors,
                    "application.uptime.hours": applicationUptimeHours,
                    "application.uptime.minutes": applicationUptimeMinutes,
                    "application.uptime.seconds": applicationUptimeSeconds
                } = metricsResponse.data;

                setMetrics({
                    memory: { allocated, used, total: totalMemory },
                    disk: { used: diskUsed, total: totalDisk, free: freeDisk },
                    cpu: { load: cpuLoad, availableProcessors },
                    uptime: { hours: applicationUptimeHours, minutes: applicationUptimeMinutes, seconds: applicationUptimeSeconds }
                });
            } catch (error) {
                console.error('Data fetch error:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCounts();
    }, []);

    const { memory, disk, cpu, uptime } = metrics;



    if (loading) {
        return <Loader />
    }

    // Bellek kullanım oranlarını hesapla
    const usedPercentage = (memory.used / memory.total) * 100;
    const allocatedPercentage = (memory.allocated / memory.total) * 100;
    const remainingPercentage = 100 - usedPercentage - allocatedPercentage;

    // Disk kullanım oranını hesapla
    const diskUsedPercentage = (disk.used / disk.total) * 100;

    return (
        <>
            <div className="container mt-4">
                <div className="row">
                    {/* Toplam Veriler */}
                    <div className="col-lg-3 col-md-6">
                        <div className="card text-white bg-primary mb-3">
                            <div className="card-header">Toplam Kullanıcı Sayısı</div>
                            <div className="card-body text-center">
                                <h5 className="card-title">{totalUsers}</h5>
                                <p className="card-text">Aylık Artış: {monthlyUserIncrease}</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-3 col-md-6">
                        <div className="card text-white bg-success mb-3">
                            <div className="card-header">Toplam Gönderi Sayısı</div>
                            <div className="card-body text-center">
                                <h5 className="card-title">{totalArticles}</h5>
                                <p className="card-text">Aylık Artış: {monthlyArticleIncrease}</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-3 col-md-6">
                        <div className="card text-white bg-warning mb-3">
                            <div className="card-header">Toplam Makale Sayısı</div>
                            <div className="card-body text-center">
                                <h5 className="card-title">{totalArticles}</h5>
                                <p className="card-text">Aylık Artış: {monthlyArticleIncrease}</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-3 col-md-6">
                        <div className="card text-white bg-info mb-3">
                            <div className="card-header">Toplam Konu Sayısı</div>
                            <div className="card-body">
                                <h5 className="card-title">800</h5>
                                <p className="card-text">Aylık Artış: {monthlyTopicIncrease}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Aylık Artış Verileri */}
                <div className="row mt-4">
                    <div className="col-lg-6 col-md-12">
                        <div className="card mb-3">
                            <div className="card-header">Aylık Kullanıcı Artışı</div>
                            <div className="card-body">
                                <h5 className="card-title">Bu ay {monthlyUserIncrease} yeni kullanıcı</h5>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-6 col-md-12">
                        <div className="card mb-3">
                            <div className="card-header">Aylık Makale Artışı</div>
                            <div className="card-body">
                                <h5 className="card-title">Bu ay {monthlyArticleIncrease} yeni makale</h5>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-6 col-md-12">
                        <div className="card mb-3">
                            <div className="card-header">Aylık Konu Artışı</div>
                            <div className="card-body">
                                <h5 className="card-title">Bu ay {monthlyTopicIncrease} yeni konu</h5>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bellek Kullanımını Göster */}
                <div className="row mt-4">
                    <div className="col-lg-3 col-md-6">
                        <div className="card mb-3">
                            <div className="card-header">Bellek Kullanımı</div>
                            <i className="bi bi-memory" style={{ fontSize: '40px', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}></i>
                            <p style={{ fontSize: '24px', fontWeight: 'bold', color: 'black', position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                                {Math.round(usedPercentage)}%
                            </p>
                            <div className="card-body text-center">
                                <CircularProgressbar
                                    value={usedPercentage + allocatedPercentage + remainingPercentage}
                                    styles={buildStyles({
                                        rotation: 0,
                                        strokeLinecap: 'round',
                                        pathTransitionDuration: 0.5,
                                        pathColor: `rgba(255, 0, 0, ${usedPercentage / 100})`, // Kırmızı
                                        trailColor: 'transparent',
                                    })}
                                />
                                <hr />
                                <div className="mt-2" style={{ position: 'relative' }}>

                                    <p className="text-danger" title={`Kullanılan Bellek: ${memory.used} MB (${usedPercentage.toFixed(2)}%)`}>
                                        <span style={{ color: 'red', fontWeight: 'bold' }}>●</span> Kullanılan Bellek: {memory.used} MB
                                    </p>
                                    <p className="text-warning" title={`Rezerve Edilmiş Bellek: ${memory.allocated} MB (${allocatedPercentage.toFixed(2)}%)`}>
                                        <span style={{ color: 'orange', fontWeight: 'bold' }}>●</span> Rezerve Edilmiş Bellek: {memory.allocated} MB
                                    </p>
                                    <p className="text-success" title={`Toplam Bellek: ${memory.total} MB`}>
                                        <span style={{ color: 'green', fontWeight: 'bold' }}>●</span> Toplam Bellek: {memory.total} MB
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Disk Kullanımını Göster */}
                    <div className="col-lg-3 col-md-6">
                        <div className="card mb-3">
                            <div className="card-header">Disk Kullanımı</div>
                            <i className="bi bi-hdd" style={{ fontSize: '40px', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}></i>
                            <p style={{ fontSize: '24px', fontWeight: 'bold', color: 'black', position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                                {Math.round(diskUsedPercentage)}%
                            </p>
                            <div className="card-body text-center">
                                <CircularProgressbar
                                    value={diskUsedPercentage}
                                    styles={buildStyles({
                                        rotation: 0,
                                        strokeLinecap: 'round',
                                        pathTransitionDuration: 0.5,
                                        pathColor: `rgba(0, 123, 255, ${diskUsedPercentage / 100})`, // Mavi
                                        trailColor: 'transparent',
                                    })}
                                />
                                <hr />
                                <div className="mt-2" style={{ position: 'relative' }}>
                                    <p className="text-info" title={`Kullanılan Disk: ${disk.used} MB (${diskUsedPercentage.toFixed(2)}%)`}>
                                        <span style={{ color: 'blue', fontWeight: 'bold' }}>●</span> Kullanılan Disk: {disk.used} MB
                                    </p>
                                    <p className="text-warning" title={`Toplam Disk: ${disk.total} MB`}>
                                        <span style={{ color: 'orange', fontWeight: 'bold' }}>●</span> Toplam Disk: {disk.total} MB
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* CPU Kullanımını Göster */}
                    <div className="col-lg-3 col-md-6">
                        <div className="card mb-3">
                            <div className="card-header">CPU Yükü</div>
                            <i className="bi bi-cpu" style={{ fontSize: '40px', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}></i>
                            <p style={{ fontSize: '24px', fontWeight: 'bold', color: 'black', position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                                {cpu.load.toFixed(2)}%
                            </p>
                            <div className="card-body text-center">
                                <CircularProgressbar
                                    value={cpu.load}
                                    styles={buildStyles({
                                        rotation: 0,
                                        strokeLinecap: 'round',
                                        pathTransitionDuration: 0.5,
                                        pathColor: `rgba(255, 0, 0, ${cpu.load / 100})`, // Yeşil
                                        trailColor: 'transparent',
                                    })}
                                />
                                <hr />

                                <div className="mt-2">
                                    <p className="text-success" title={`Mevcut CPU Yükü: ${cpu.load}%`}>
                                        <span style={{ color: 'green', fontWeight: 'bold' }}>●</span> Mevcut CPU Yükü: {cpu.load.toFixed(2)}%
                                    </p>
                                    <p className="text-info" title={`Kullanılabilir İşlemci Sayısı: ${cpu.availableProcessors}`}>
                                        <span style={{ color: 'blue', fontWeight: 'bold' }}>●</span> Kullanılabilir İşlemci: {cpu.availableProcessors}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-3 col-md-6">
                        <div className="card mb-3">
                            <div className="card-header">Sistem çalışma zamanı</div>
                            <i className="bi hdd-network" style={{ fontSize: '40px', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}></i>

                            <div className="card-body text-center" style={{ position: 'relative' }}>
                                <div>
                                    <i class="bi bi-clock-history"></i>
                                    <p style={{ fontSize: '24px', fontWeight: 'bold', color: 'black', marginTop: '20px' }}>
                                        {uptime.hours}:{uptime.minutes}:{uptime.seconds}
                                    </p>
                                </div>
                                <LinearProgress
                                    color="secondary"
                                    value={uptime.hours}
                                    styles={buildStyles({
                                        rotation: 0,
                                        strokeLinecap: 'round',
                                        pathTransitionDuration: 0.5,
                                        pathColor: `rgba(0, 255, 0, ${cpu.load / 100})`, // Yeşil
                                        trailColor: 'transparent',
                                    })}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminDashboard;
