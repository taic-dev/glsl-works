#version 300 es
precision highp float;
out vec4 fragColor;
uniform vec2 u_resolution;
uniform float u_time;

void main() {
  vec2 uv = (gl_FragCoord.xy * 2.0 - u_resolution) / min(u_resolution.x, u_resolution.y);

  vec2 q = mod(uv, 0.2) -0.1;

  float ip = 0.;
  float c = 0.;
  for(float i=0.; i<10.; i++) {
    ip = dot(1., i);
    c += length(q * 10.) + sin(u_time * 1.);
  }

  vec3 col = vec3(sin(abs(pow(c, 2.)) / ip * 0.5));
 
  fragColor = vec4(col, 1.);
}