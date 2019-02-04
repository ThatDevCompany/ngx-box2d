import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { BodyComponent } from './body.component'
import { WorldComponent } from './world.component'

/* MODULE DEFINITION */
/**
 * A module of all the core angular components used within the application
 */
@NgModule({
	imports: [CommonModule],
	declarations: [WorldComponent, BodyComponent],
	exports: [WorldComponent, BodyComponent]
})
export class NgxBox2dModule {}
