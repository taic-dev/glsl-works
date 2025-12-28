const float PI = 3.1415926;

// HSV → RGB
vec3 hsv2rgb(vec3 c) {
  vec3 rgb = clamp(
    abs(mod(c.x * 6.0 + vec3(0.0,4.0,2.0),6.0)-3.0)-1.0,
    0.0,
    1.0
  );
  return c.z * mix(vec3(1.0), rgb, c.y);
}

mat2 rotate2d(float _angle){
    return mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle));
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{  
  // 正規化（この時点では 0.0 ～ 1.0）
  // 正負の方向に -1.0 ～ 1.0 で値が分布するように変換
  vec2 coord = (fragCoord/iResolution.xy) * 2.0 - 1.0;
  coord.x *= iResolution.x / iResolution.y;
  // 回転
  coord = rotate2d(iTime * 0.05) * coord;

  // 光の玉
  float s;  
  float mx = sin(length(coord.x)) * 0.5;
  float my = sin(length(coord.y)) * 0.5;
  float lx = 0.01 / abs(length(coord.x) + my);
  float ly = 0.01 / abs(length(coord.y) + mx);
  float lxy = 0.01 / abs(length(coord.x - coord.y) + my);
  float lyx = 0.01 / abs(length(coord.y + coord.x) + mx);
  s = lx + ly + lxy + lyx;

  // 虹の輪
  float l = length(coord);
  float hue = (l / PI) * 10. - iTime * 0.1;
  // ドーナツ形状
  float inner = 0.6;
  float outer = 0.9;
  float blur  = 0.4;
  float ring =
      smoothstep(inner, inner + blur, l) *
      (1.0 - smoothstep(outer - blur, outer, l));
  vec3 color = hsv2rgb(vec3(hue, 1.0, ring));
 
  fragColor = vec4(color + s, 1.0);
}
