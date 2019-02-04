import { Component, Input, OnInit, ElementRef } from '@angular/core'
import { BaseMixin, DynamicClock, SubscriberMixin } from 'ngx-component-mixins'
import { B2World } from 'that-box2d-library'

/**
 * A component for managing a Box2D world
 */
@Component({
	selector: 'svg[box2d]',
	template: '<ng-content></ng-content>'
})
export class WorldComponent extends SubscriberMixin(BaseMixin)
	implements OnInit {
	/* CONSTRUCTOR */
	constructor(private hostElement: ElementRef) {
		super()
		this.hostElement.nativeElement.style.opacity = 0
		this.hostElement.nativeElement.style.transition = 'opacity 0.3s'
	}

	/* INPUTS */
	/**
	 * How quickly does time tick
	 * (Units are abitrary)
	 */
	@Input()
	speed: number = 5

	/**
	 * The Box2D world associated with this component
	 */
	@Input()
	world: B2World

	/**
	 * The dynamic clock which governs the world time
	 */
	@Input()
	clock: DynamicClock

	/**
	 * The number of velocity calculations to perform each tick
	 */
	@Input()
	velocityIterations: number = 6

	/**
	 * The number of position calculations to perform each tick
	 */
	@Input()
	positionIterations: number = 2

	/* LIFECYCLE METHODS */
	ngOnInit() {
		// Subscribe to dynamic clock
		this.subscribeTo(this.clock, ({ diff }) => this.doTick(diff))

		// Fade in
		setTimeout(() => {
			this.hostElement.nativeElement.style.opacity = 1
		}, 500)
	}

	/* METHODS */
	/**
	 * Process a tick of the clock
	 */
	doTick(diff: number) {
		if (diff) {
			this.world.Step(
				diff / ((11 - this.speed) * 40),
				this.velocityIterations,
				this.positionIterations
			)
		}
	}
}
