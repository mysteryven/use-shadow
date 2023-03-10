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
    const { styleContent, styleSheets, shadowRootInit } = ensureDefaultProps(opts)

    useEffect(() => {
        if (
            !parentRef.current
            || hasInitialized
            || parentRef.current.shadowRoot
        ) {
            return
        }

        setShadowRoot(parentRef.current.attachShadow(shadowRootInit))
        setInitialized(true)
    }, [parentRef.current])

    useEffect(() => {
        if (shadowRoot) {
            const withStyleComponent = (
                <>
                    {styleContent && <style>{styleContent}</style>}
                    {styleSheets.map(s => <link key={s} rel="stylesheet" href={s} />)}
                    {Component}
                </>
            )
            setShadowPortal(createPortal(withStyleComponent, shadowRoot))
        }
    }, [shadowRoot, ...deps])

    return (
        <div ref={parentRef}>
            {shadowPortal}
        </div>
    )
}
