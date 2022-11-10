import React, { ReactNode, useEffect, useRef, useState, DependencyList, useMemo } from "react";
import { render, createPortal } from 'react-dom'

interface Options {
    styleContent?: string;
    styleSheets?: string[];
    shadowRootInit?: ShadowRootInit,
}

const DEFAULT_OPTIONS = {
    styleContent: '',
    styleSheets: [],
    shadowRootInit: {
        mode: 'open'
    }
} as const

function ensureDefaultProps(options: Options) {
    return {
        ...DEFAULT_OPTIONS,
        ...options
    }
}

export default function useShadow(Component: ReactNode, deps: DependencyList = [], opts: Options = {}) {
    const [hasInitialized, setInitialized] = useState(false)
    const parentRef = useRef<HTMLDivElement>(null)
    const [shadowPortal, setShadowPortal] = useState<React.ReactPortal>()
    const [shadowRoot, setShadowRoot] = useState<ShadowRoot>()
    const ensuredOpts = ensureDefaultProps(opts)
    const allStyleContent = useMemo(() => {
        const { styleSheets, styleContent } = ensuredOpts
        return `
            ${styleSheets.map(s => `@import url(${s})`).join(';')};
            ${styleContent}
        `
    }, [
        ensuredOpts.styleContent,
        ensuredOpts.styleSheets.join(',')
    ])

    useEffect(() => {
        if (
            !parentRef.current
            || hasInitialized
            || parentRef.current.shadowRoot
        ) {
            return
        }

        setShadowRoot(parentRef.current.attachShadow(ensuredOpts.shadowRootInit))
        setInitialized(true)
    }, [parentRef.current])

    useEffect(() => {
        if (shadowRoot) {
            const withStyleComponent = (
                <>
                    {Component}
                    {
                        hasCustomStyle && <style>{allStyleContent}</style>
                    }
                </>
            )
            setShadowPortal(createPortal(withStyleComponent, shadowRoot))
        }
    }, [shadowRoot, ...deps])

    const hasCustomStyle = ensuredOpts.styleContent || ensuredOpts.styleSheets.length > 0

    return (
        <div ref={parentRef}>
            {shadowPortal}
        </div>
    )
}
