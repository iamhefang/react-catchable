import * as React from "react";
interface State {
    error: Error
    errorInfo: React.ErrorInfo
    crashed: boolean
}
export type ErrorChild = React.ReactNode | ((error: Error, errorInfo: React.ErrorInfo) => React.ReactNode)
export default function catchable<T>(WrappedComponent: React.ComponentType<T>, errorChild?: ErrorChild): React.ComponentType<T> {
    return class Catchable extends React.Component<T, State> {
        constructor(props: T) {
            super(props);
            this.state = {
                error: null, errorInfo: null, crashed: false
            };
        }
        componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
            this.setState({
                error, errorInfo, crashed: true
            });
            if (console && console.group) {
                console.group(`%c组件${WrappedComponent.name || ""}崩溃了|Compnent Crashed`, "font-size:20px;color:#ff0047");
                console.error(error);
                console.error(errorInfo.componentStack);
                console.groupEnd()
            }
        }

        private renderErrorChild = () => {
            try {
                const { error, errorInfo } = this.state;

                return typeof errorChild === "function" ? errorChild(error, errorInfo) : (errorChild || <span style={{ color: 'red' }} title={error.message}>Component Crashed</span>);
            } catch (e) {
                return <span style={{ color: 'red' }} title={e.message}>Error Child Component Crashed</span>;
            }
        }

        render() {
            return this.state.crashed ? this.renderErrorChild() : <WrappedComponent {...this.props} />;
        }
    }
}