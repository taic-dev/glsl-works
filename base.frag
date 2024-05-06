#version 300 es
precision highp float;
out vec4 fragColor;
uniform vec2 u_resolution;
uniform float u_time;

void main() {
  vec2 uv = 2.0 * (gl_FragCoord.xy / u_resolution.xy) - 1.0;
  fragColor = vec4(uv, 0., 1.);
}