#version 300 es
precision highp float;
out vec4 fragColor;
uniform vec2 u_resolution;
uniform float u_time;

vec3 palette(float t) {
  vec3 a = vec3(0.5059, 0.8196, 0.0706);
  vec3 b = vec3(-1.100, -1.100, 0.858);
  vec3 c = vec3(1.0, 1.0, 1.0);
  vec3 d = vec3(0.6667, 0.0, 0.0);

  return a+b*cos(6.28318*(c*t+d));
}

void main() {
  vec2 uv = 2.0 * (gl_FragCoord.xy / u_resolution.xy) - 1.0;

  vec2 clone_uv = uv;
  uv *= 3.0;

  float f = length(uv.x * uv.y);
  for(float i = 1.0; i<= 5.0; i++){
    f += pow(fract(f * (uv.x * uv.y)), i * tan(u_time*0.5));
  }

  fragColor = vec4(vec3(palette(f) * 10. * 100.),1.);
}