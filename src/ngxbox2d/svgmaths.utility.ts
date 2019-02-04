import { B2Vec2, B2Body, B2Fixture, B2PolygonShape } from 'that-box2d-library'

/**
 * A utility class for performing SVG maths
 */
export const SVGMathsUtility = {
	/**
	 * Convert a Box2D fixture into an SVG path
	 */
	fixturePath(body: B2Body, fixture: B2Fixture): string {
		let path = '',
			shape = fixture.m_shape

		// If the Shape is a Polygon
		if (shape instanceof B2PolygonShape) {
			const polyShape = <B2PolygonShape>shape
			polyShape.m_vertices.forEach((v, i) => {
				if (i < polyShape.m_count) {
					const vw = body.GetWorldPoint(v, new B2Vec2(0, 0))
					path += '' + (i === 0 ? 'M ' : 'L ') + vw.x + ' ' + vw.y + ' '
				}
			})
			path +=
				'L ' +
				body.GetWorldPoint(polyShape.m_vertices[0], new B2Vec2(0, 0)).x +
				' ' +
				body.GetWorldPoint(polyShape.m_vertices[0], new B2Vec2(0, 0)).y
		}

		// Done
		return path
	}
}
