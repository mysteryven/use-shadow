import React, { ReactNode, useEffect, useRef, useState, DependencyList } from "react";
import { render, createPortal } from 'react-dom'

interface Options {
    shadowRootInit?: ShadowRootInit,
}

const DEFAULT_OPTIONS = {
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
            setShadowPortal(createPortal(Component, shadowRoot))
        }
    }, [shadowRoot, ...deps])

    return (
        <div ref={parentRef}>
            {shadowPortal}
        </div>
    )
}
