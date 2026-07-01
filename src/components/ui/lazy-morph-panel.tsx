'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { COPILOT_OPEN_EVENT } from '../../lib/copilot-events';

const MorphPanel = dynamic(() => import('./ai-input'), {
    ssr: false,
});

export default function LazyMorphPanel() {
    // Only mount after the page loader signals it's done, so the dock
    // doesn't appear on top of the loader screen.
    const [loaderDone, setLoaderDone] = useState(false);
    const [shouldLoad, setShouldLoad] = useState(false);
    const [openOnMount, setOpenOnMount] = useState(false);

    // Wait for the loader to finish before doing anything
    useEffect(() => {
        const onDone = () => setLoaderDone(true);
        window.addEventListener('portfolio:loader-done', onDone, { once: true });
        return () => window.removeEventListener('portfolio:loader-done', onDone);
    }, []);

    useEffect(() => {
        if (!loaderDone) return;

        const load = () => setShouldLoad(true);

        const onOpen = (event: Event) => {
            load();
            if ((event as CustomEvent<{ immediate?: boolean }>).detail?.immediate) {
                setOpenOnMount(true);
            }
        };

        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'k' && (event.metaKey || event.ctrlKey)) {
                load();
            }
        };

        window.addEventListener(COPILOT_OPEN_EVENT, onOpen);
        window.addEventListener('keydown', onKeyDown);
        window.addEventListener('pointerdown', load, { once: true });
        window.addEventListener('scroll', load, { once: true, passive: true });

        let idleId: number | undefined;
        let timeoutId: ReturnType<typeof setTimeout> | undefined;

        if ('requestIdleCallback' in window) {
            idleId = window.requestIdleCallback(load, { timeout: 800 });
        } else {
            timeoutId = setTimeout(load, 600);
        }

        return () => {
            window.removeEventListener(COPILOT_OPEN_EVENT, onOpen);
            window.removeEventListener('keydown', onKeyDown);
            if (idleId !== undefined) window.cancelIdleCallback(idleId);
            if (timeoutId) clearTimeout(timeoutId);
        };
    }, [loaderDone]);

    if (!loaderDone || !shouldLoad) return null;

    return <MorphPanel openOnMount={openOnMount} />;
}
