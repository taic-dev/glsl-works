vec3 palette( in float t ){
    vec3 a = vec3(0.5, 0.5, 0.5);
    vec3 b = vec3(0.5, 0.5, 0.5);
    vec3 c = vec3(2.0, 1.0, 0.0);
    vec3 d = vec3(0.50, 0.20, 0.25);
    return a + b*cos( 6.283185*(c*t+d) );
}

mat2 rotate2d(float _angle){
    return mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle));
}

float sdHexagram( in vec2 p, in float r )
{
    const vec4 k = vec4(-0.5,0.8660254038,0.5773502692,1.7320508076);
    p = abs(p);
    p -= 2.0*min(dot(k.xy,p),0.0)*k.xy;
    p -= 2.0*min(dot(k.yx,p),0.0)*k.yx;
    p -= vec2(clamp(p.x,r*k.z,r*k.w),r);
    return length(p)*sign(p.y);
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 uv = fragCoord/iResolution.xy * 2.0 - 1.;
    uv.x *= iResolution.x / iResolution.y;
    uv = rotate2d(iTime*0.1) * uv;
    vec2 uv0 = uv;
    
    vec3 finalColor = vec3(0.);
    
    for(float i = 0.;i<4.;i++){
        uv = fract(uv*0.9) * 2. -1.;
        uv0 += rotate2d(iTime*i) * uv;

        // hxagram
        float d = sdHexagram(uv0, 0.5);

        vec3 color = palette(d + length(uv));

        d = sin(d * 7.+ iTime *i) /7.;
        d = step(0.1, d);

        finalColor += color *  d;
    }

    // Output to screen
    fragColor = vec4(finalColor,1.0);
}