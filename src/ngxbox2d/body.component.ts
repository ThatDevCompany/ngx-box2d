import { Component, Input, ViewChild, ElementRef } from '@angular/core'
import { Base, DynamicClock, Subscriber } from 'ngx-component-mixins'
import { B2World, B2Body, B2BodyType, B2Fixture } from 'that-box2d-library'
import { SVGMathsUtility } from './svgmaths.utility'

/**
 * A component for attaching a Box2D body to a Angular Component
 */
@Component({
	selector: 'g[box2d]',
	template:
		'<svg:path ' +
		'*ngFor="let fixture of fixtures" ' +
		'[attr.d]="fixture.m_userData.path" ' +
		'[attr.class]="fixture.m_userData.class"></svg:path>'
})
export class BodyComponent extends Subscriber(Base) {
	/* CONSTRUCTOR */
	constructor(private hostElement: ElementRef) {
		super()
	}

	/* INPUTS */
	/**
	 * The body to which this component is associated
	 */
	@Input()
	body: B2Body

	/**
	 * The world to which this body belongs
	 */
	@Input()
	world: B2World

	/**
	 * The dynamic clock
	 */
	@Input()
	clock: DynamicClock

	/* PROPERTIES */
	/**
	 * The SVG path
	 */
	@ViewChild('pathElement')
	pathElement: ElementRef

	/**
	 * The fixtures that make up the body
	 */
	fixtures: Array<B2Fixture> = []

	/* LIFECYCLE METHODS */
	ngOnInit() {
		// Subscribe to Tick to animate (unless we're a static body)
		if (this.clock && this.body.m_type !== B2BodyType.B2_staticBody) {
			this.subscribeTo(this.clock, () => this.doTick())
		}

		// Build Fixtures List
		let fixture = this.body.GetFixtureList()
		while (fixture) {
			this.fixtures.push(fixture)
			fixture = fixture.GetNext()
		}

		// Set Fixture Positions
		this.doSetFixturePositions()
	}

	/* METHODS */
	/**
	 * Process a tick of the clock
	 */
	doTick() {
		if (this.body && this.body.m_userData.tick) {
			this.body.GetUserData().tick()
		}

		this.doSetFixturePositions()
	}

	/**
	 * Set the position of each fixture
	 */
	doSetFixturePositions() {
		if (this.body.IsAwake()) {
			this.fixtures.forEach(fixture => {
				fixture.m_userData.path = SVGMathsUtility.fixturePath(
					this.body,
					fixture
				)
			})
		}
	}
}
