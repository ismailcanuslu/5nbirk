package com.blog._nbirk.services;

import io.micrometer.core.instrument.MeterRegistry;
import jakarta.annotation.PostConstruct;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.io.File;
import java.lang.management.ManagementFactory;
import java.lang.management.MemoryMXBean;
import java.lang.management.MemoryUsage;
import java.lang.management.OperatingSystemMXBean;
import java.util.HashMap;
import java.util.Map;
@Service
public class MetricsService {

    private final MeterRegistry meterRegistry;
    private Map<String, Object> metricsData = new HashMap<>();

    private long applicationStartTime;

    public MetricsService(MeterRegistry meterRegistry) {
        this.meterRegistry = meterRegistry;
    }

    @PostConstruct
    public void init() {
        applicationStartTime = System.currentTimeMillis();
        collectMetrics();
    }


    @Scheduled(fixedRate = 60000)
    public void collectMetrics() {
        updateMetrics();
    }

    public void updateMetrics() {
        MemoryMXBean memoryMXBean = ManagementFactory.getMemoryMXBean();
        MemoryUsage heapMemoryUsage = memoryMXBean.getHeapMemoryUsage();
        OperatingSystemMXBean osBean = ManagementFactory.getOperatingSystemMXBean();


        metricsData.put("memory.total", bytesToMB(heapMemoryUsage.getMax()));
        metricsData.put("memory.used", bytesToMB(heapMemoryUsage.getUsed()));
        metricsData.put("memory.allocated", bytesToMB(heapMemoryUsage.getCommitted()));


        metricsData.put("disk.used", bytesToMB(getUsedDiskSpace()));
        metricsData.put("disk.total", bytesToMB(getTotalDiskSpace()));
        metricsData.put("disk.free", bytesToMB(getFreeDiskSpace()));


        metricsData.put("cpu.load", osBean.getSystemLoadAverage());
        metricsData.put("cpu.availableProcessors", osBean.getAvailableProcessors());

        long uptimeMillis = System.currentTimeMillis() - applicationStartTime;
        long uptimeSeconds = uptimeMillis / 1000;
        long hours = uptimeSeconds / 3600;
        long minutes = (uptimeSeconds % 3600) / 60;
        long seconds = uptimeSeconds % 60;

        metricsData.put("application.uptime.hours", hours);
        metricsData.put("application.uptime.minutes", minutes);
        metricsData.put("application.uptime.seconds", seconds);
    }

    public Map<String, Object> getMetricsData() {
        return metricsData;
    }


    private long bytesToMB(long bytes) {
        return bytes / (1024 * 1024);
    }

    private long getUsedDiskSpace() {
        File root = new File("/");
        long total = root.getTotalSpace();
        long free = root.getFreeSpace();
        return total - free;
    }

    private long getTotalDiskSpace() {
        return new File("/").getTotalSpace();
    }

    private long getFreeDiskSpace() {
        return new File("/").getFreeSpace();
    }
}