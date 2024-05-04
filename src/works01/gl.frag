#version 300 es
precision highp float;
out vec4 fragColor;

uniform vec2 u_resolution;
uniform float u_time;

const float PI = 3.1415926535;

float fractSin11(float x) {
  return fract(100000.0 * sin(x));
}

float fractSin21(vec2 xy) {
  return fract(sin(dot(xy, vec2(12.9898, 78.2333))) * 43758.5453423);
}

void main() {
  vec2 pos = gl_FragCoord.xy / u_resolution.xy;

  pos += floor(50. * u_time);

  fragColor = vec4(fractSin21(pos.xy / u_resolution.xy));
}