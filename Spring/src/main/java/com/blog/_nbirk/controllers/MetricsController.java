package com.blog._nbirk.controllers;

import com.blog._nbirk.services.MetricsService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;


@RestController
public class MetricsController {

    private final MetricsService metricsService;

    public MetricsController(MetricsService metricsService) {
        this.metricsService = metricsService;
    }

    @GetMapping("/metrics")
    public Map<String, Object> getMetrics() {
        return metricsService.getMetricsData();
    }


    @PostMapping("/metrics/update")
    public Map<String, Object> updateMetrics() {
        metricsService.updateMetrics();
        return metricsService.getMetricsData();
    }
}
