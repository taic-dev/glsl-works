#version 300 es
precision highp float;
out vec4 fragColor;
uniform vec2 u_resolution;
uniform float u_time;

vec3 palette(float t) {
  vec3 a = vec3(0.7608, 0.3333, 0.0667);
  vec3 b = vec3(-1.100, -1.100, 0.858);
  vec3 c = vec3(1.0, 1.0, 1.0);
  vec3 d = vec3(0.6667, 0.0, 0.0);

  return a+b*cos(6.28318*(c*t+d));
}

void main() {
  vec2 uv = 2.0 * (gl_FragCoord.xy / u_resolution.xy) - 1.0;
  vec2 uv0 = uv;
  vec3 fianlColor = vec3(0.0);

  for(float i = 0.0; i < 15.0; i++) {
    uv *= 2.;
    uv = fract(uv * 0.5);
    uv -= 0.5;

    float d = length(uv * cos(u_time * 0.5));
    vec3 col = palette(length(uv0) + u_time * 0.2);

    d = sin(d*10. + u_time * 0.0001) / 1.;
    d = pow(0.02 / d, 1.);

    fianlColor += col * d;
  }

  fragColor = vec4(fianlColor, 1.);
}