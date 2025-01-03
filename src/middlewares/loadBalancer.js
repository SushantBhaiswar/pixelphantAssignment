const LoadBalancer = class {
    constructor(services) {
        this.services = {};
        Object.entries(services).forEach(([name, config]) => {
            this.services[name] = {
                urls: [...config.urls],
                currentIndex: 0
            };
        });
    }

    getNextUrl(serviceName) {
        const service = this.services[serviceName];
        if (!service) throw new Error(`Service ${serviceName} not found`);

        const url = service.urls[service.currentIndex];
        service.currentIndex = (service.currentIndex + 1) % service.urls.length;
        return url;
    }
};

