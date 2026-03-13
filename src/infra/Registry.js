// ═══════════════════════════════════════════════════════
// Global Registry – Unified Teardown for All Instances
// ═══════════════════════════════════════════════════════

export const Registry = {
    instances: new Set(),

    add(instance) {
        this.instances.add(instance);
    },

    remove(instance) {
        this.instances.delete(instance);
    },

    cleanupAll() {
        this.instances.forEach(i => {
            if (i.destroy) i.destroy();       // Charts (Chart.js, etc.)
            if (i.disconnect) i.disconnect();  // Observers (ResizeObserver, IntersectionObserver)
            if (i.abort) i.abort();            // AbortControllers
        });
        this.instances.clear();
        console.info(`[REGISTRY] ✓ cleanupAll() – all instances torn down`);
    }
};
