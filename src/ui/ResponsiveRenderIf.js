import React from "react";

export default class ResponsiveRenderIf extends React.Component {
    constructor(props) {
        super(props);
        this.state = { canRender: false };
        this._mediaQueryList = null;
        this._updateState = this._updateState.bind(this);
    }

    componentWillMount() {
        this._tryToRender();
    }

    componentWillUnmount() {
        this._dispose();
    }

    componentWillReceiveProps(nextProps) {
        this._tryToRender(nextProps);
    }

    _tryToRender(props = this.props) {
        if (!props.query) {
            throw new Error("ResponsiveRenderIf: `query` is a required prop!");
        }

        this._dispose();
        this._mediaQueryList = global.matchMedia(props.query);
        this._mediaQueryList.addListener(this._updateState);
        this._updateState();
    }

    _dispose() {
        if (this._mediaQueryList) {
            this._mediaQueryList.removeListener(this._updateState);
            this._mediaQueryList = null;
        }
    }

    _updateState() {
        if (this._mediaQueryList.matches !== this.state.canRender) {
            this.setState({ canRender: this._mediaQueryList.matches });
        }
    }

    _render() {
        const { masqueradeAs, query, children, ...additionProps } = this.props;
        const multipleChildren = children.length > 1;
        const hasAdditionProps = Object.keys(additionProps).length;

        if (multipleChildren || masqueradeAs || hasAdditionProps) {
            const Component = masqueradeAs || "div";
            return <Component {...additionProps}>{children}</Component>;
        } else {
            return this.props.children; // Render the single child without a wrapper.
        }
    }

    render() {
        return this.state.canRender ? this._render() : null;
    }
}

if (process.env.NODE_ENV !== "production") {
    ResponsiveRenderIf.propTypes = {
        query: React.PropTypes.string.isRequired,
        masqueradeAs: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.element
        ])
    };
}
