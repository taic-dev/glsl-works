#version 300 es
precision highp float;
out vec4 fragColor;
uniform vec2 u_resolution;
uniform float u_time;

void main() {
  vec2 uv = (gl_FragCoord.xy * 2.0 - u_resolution) / min(u_resolution.x, u_resolution.y);

  float ip = 0.;
  float c = 0.;
  for(float i=0.; i<100.; i++) {
    ip = dot(100., i);
    c += length(uv * 100.) + u_time * 0.1;
  }

  vec3 col = vec3(sin(abs(pow(c, 2.)) / ip));
 
  fragColor = vec4(col, 1.);
}