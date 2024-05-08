#version 300 es
precision highp float;
out vec4 fragColor;
uniform vec2 u_resolution;
uniform float u_time;

void main() {
  vec2 uv = 2.0 * (gl_FragCoord.xy / u_resolution.xy) - 1.0;
  
  uv = fract(uv * 3.);
  uv -= 0.5;

  vec3 col = vec3(length(uv * 5.) * sin(u_time));

  // float d = pow(u_time, 4.);

  vec3 fianlColor = col;

  fragColor = vec4(fianlColor, 1.);
}