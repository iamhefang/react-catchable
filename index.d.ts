import * as React from "react";

export type ErrorChild = React.ReactNode | ((error: Error, errorInfo: React.ErrorInfo) => React.ReactNode);
export default function catchable<T>(WrappedComponent: React.ComponentType<T>, errorChild?: ErrorChild): React.ComponentType<T>;