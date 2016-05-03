'use strict';

import React from 'react';
import ReactRouter from 'react-router';
import {Motion, spring} from 'react-motion';

class HomeBlock extends React.Component {

	constructor (props) {

		super(props);

		// Default state
		this.state = {
			open: false,
			mountContent: false,
			zIndex: null
		};

		// Component DOM elements
		this.els = {};

		// The default element position
		this.defaultPosition = {};

	}

	componentDidMount () {

		// Set the default position and everytime the browser resizes
		setTimeout(() => {
			this.setBlockDefaults();
		});

		// Set event listeners
		this.setEventListeners();

	}

	componentWillUnmount () {

		// Remove event listeners

	}

	componentDidUpdate () {

		console.log("componentDidUpdate callback");

		// Update the ZIndex
		//this.setZIndex();

	}

	setEventListeners () {

		// Scroll event listener
		window.addEventListener('scroll', e => this.onScrollHandler(e));

	}

	removeEventListeners () {

		window.removeEventListeners('scroll', this.onScrollHandler);

	}

	setBlockDefaults () {

		for (var key in this.els) {
			this.defaultPosition[key] = this.calcElementPosition(this.els[key]);
		}

	}

	setBlockSize (el) {

		el.style.width = this.defaultPosition[''] + 'px';

	}

	setElement (key, node) {

		this.els[key] = node;

	}

	calcElementPosition (el) {

		return el.getBoundingClientRect();

	}

	updateHash () {

		// the hash value needs to be passed to props
		// using hard typed value atm for testing
		history.pushState(null, null, '/#/case-study-vans');

	}

	openBlock () {

		this.setState({open: !this.state.open});

		if (this.state.open) {

			// Calculate DOM position
			this.pos = this.calcElementPosition(this.els['block']);

			// this should be moved and treated only for modal elements
			history.pushState(null, null, '/#/');

		} else {

			// refactor to treat only modal elements
			this.updateHash();

		}

	}

	onRestCallback () {

		console.log("onRest!");

		this.state.open ? this.onBlockOpen() : this.onBlockCollapse();

	}

	onBlockOpen () {

		console.log('onBlockOpen callback');

		// Set block element to fix position
		this.props.setNoScroll(true);

		// Update children mount state
		this.setState({
			mountContent: true
		});

	}

	onBlockCollapse () {

		// Set block element to fix position
		this.props.setNoScroll(false);

		// Update children mount state
		this.setState({
			mountContent: false
		});

	}

	onScrollHandler (e) {

		// Update the block Y position
		if (this.state.open) {

		}

	}

	motionStyleFromTo () {

		return {
			width: spring(this.state.open ? window.innerWidth : 500),
			height: spring(this.state.open ? window.innerHeight : 300),
			top: spring(this.state.open ? -this.defaultPosition['block'].top : 0),
			left: spring(this.state.open ? -this.defaultPosition['block'].left : 0)
		};

	}

	setZIndex () {

		var zIndex = null;

		if (this.state.open) {

			zIndex = 999;

		} else {

			zIndex = null;

		}

		this.setState({
			zIndex: zIndex
		});

		return null;

	}

	render () {

		return (
			<div className={ "home-block" + " " + this.props.innerComponent.className } onClick={this.openBlock.bind(this)} style={{ zIndex: this.state.open ? 999 : '' }}>
				<div className="block" ref={this.setElement.bind(this, 'block')}>
					<Motion onRest={this.onRestCallback.bind(this)} style={this.motionStyleFromTo()}>
						{style =>
							<div className="content" style={{
								width: `${style.width}px`,
								height: `${style.height}px`,
								top: `${style.top}px`,
								left: `${style.left}px`
								}}>
								{this.state.mountContent ? <this.props.innerComponent.component /> : null}
							</div>
						}
					</Motion>
				</div>
			</div>
		);

	}

}

export default HomeBlock;