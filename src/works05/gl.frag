#version 300 es
precision highp float;
out vec4 fragColor;
uniform vec2 u_resolution;
uniform float u_time;

// vec3 palette(float t) {
//   vec3 a = vec3(0.5059, 0.8196, 0.0706);
//   vec3 b = vec3(-1.100, -1.100, 0.858);
//   vec3 c = vec3(1.0, 1.0, 1.0);
//   vec3 d = vec3(0.6667, 0.0, 0.0);

//   return a+b*cos(6.28318*(c*t+d));
// }

void main() {
  vec2 uv = 2.0 * (gl_FragCoord.xy / u_resolution.xy) - 1.0;
  vec2 p = 2.0 * uv - 1.0;
  
  // uv.x = mix(uv.x, length(p), cos(10.));
  // uv.y = mix(uv.y, length(p), cos(10.));

  // uv = fract(uv * 1.);
  
  // step(3., u_time)

  float c = 0.;
  for(float i=0.; i<100.; i++) {
    c += length(uv * 100.) + u_time * 0.1;
  }

  vec3 col = vec3(sin(c));
 
  // vec3 fianlColor = col;

  fragColor = vec4(col, 1.);
}