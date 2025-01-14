


var Sphere = function(origin = new Vector3(), radius = 1) {
	this.origin = origin;
	this.radius = radius;

	// todo - make sure origin and radius are replaced with default values if and only
	//        if they are invalid(i.e. origin & radius should be Vector3) or undefined
	//        default origin should be zero vector
	//        default radius should be 1

	this.raycast = function(ray) {
		// todo determine whether the ray intersects this sphere and where

		// Recommended steps
		// 1. review slides/book math
		// 2. create the vector(s) needed to solve for the coefficients in the
		//    quadratic equation
		// 3. calculate the discriminant
		// 4. use the result of the discriminant to determine if further computation
		//    is necessary
		// 5. return the following javascript object literal with the following properties
		//		case 1: no VALID intersections
		//	      var result = { hit: false, point: null }
		//		case 2: 1 or more intersections
		//			var result = {
		//        		hit: true,
		// 				point: 'a Vector3 containing the closest VALID intersection',
		//              normal: 'a vector3 containing a unit length normal at the intersection',
		//              distance: 'a scalar containing the intersection distance from the ray origin'
		//          }
		d = ray.direction.clone();
		o = ray.origin.clone();
		a = d.dot(d);
		b1 = o.subtract(this.origin);
		b2 = d.multiplyScalar(2);
		b = b2.dot(b1);
		c = b1.dot(b1) - this.radius * this.radius;

		discriminant = (b * b) - (4 * a * c);
		
		if(discriminant < 0){ //discriminant is negative so the ray just doesn't hit
			var result = {
				hit:false,
				point:null,
			};
		}
		else{
			alphaPos = (-1 * b + Math.sqrt(discriminant))/(2 * a);
			alphaNeg = (-1 * b - Math.sqrt(discriminant))/(2 * a);
			closer = Math.min(alphaPos, alphaNeg);
			if(closer < 0){ //negative values so the ray does not hit or is inside the sphere
				var result = {
					hit: false,
					point: null
				};
			}
			else { //the ray will hit the sphere
				oVector = ray.origin.clone();
				dVector = ray.direction.clone();
				intersect = oVector.add(dVector.multiplyScalar(closer)); //pRay = origin + alpha(direction vector)
				var result = {
					hit: true,
					point: intersect,
					normal: intersect.normalized(),
					distance: closer
				};
			}
		// todo - fill this in with the correct values
			/*var result = {
				hit: null,
				point: null,
				normal: null,
				distance: null
			};*/
		}
		return result;
	}
};