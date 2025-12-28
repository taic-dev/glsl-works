// Reference:
// YouTube - kishimisu
// https://www.youtube.com/watch?v=f4s1h2YETNY&t=174s

vec3 palette( in float t ){
    vec3 a = vec3(0.5, 0.5, 0.5);
    vec3 b = vec3(0.5, 0.5, 0.5);
    vec3 c = vec3(1.0, 1.0, 0.0);
    vec3 d = vec3(0.00, 0.10, 0.20);
    return a + b*cos( 6.283185*(c*t+d) );
}

mat2 rotate2d(float _angle){
    return mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle));
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 uv = fragCoord/iResolution.xy * 2.0 - 1.;
    uv.x *= iResolution.x / iResolution.y;
    uv = rotate2d(iTime * 0.1) * uv;
    vec2 uv0 = uv;
    vec3 finalColor = vec3(0);
    
    for(float i = 0.;i<3.;i++) {
        uv = fract(uv * 1.2);
        uv = uv *2.0 -1.;

        float d = length(uv) / exp(length(uv0 * i));
        vec3 color = palette(length(uv0) + iTime * 0.1);

        d -= 0.5;
        d = sin(d*4.+iTime)/4.;
        d = abs(d);
        d = 0.05 / d;

        finalColor += color * d;
    }

    fragColor = vec4(finalColor,1.0);
}