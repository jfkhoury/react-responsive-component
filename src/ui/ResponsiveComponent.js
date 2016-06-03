import React from "react";

export default class ResponsiveComponent extends React.Component {
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
            throw new Error("ResponsiveComponent: `query` is a required prop!");
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

    get _display() {
        return React.createElement(this.props.tag || "div",
                                   { className: "responsive-component" },
                                   this.props.children);
    }

    render() {
        return this.state.canRender ? this._display : null;
    }
}

ResponsiveComponent.propTypes = {
    query: React.PropTypes.string.isRequired,
    tag: React.PropTypes.string
};
