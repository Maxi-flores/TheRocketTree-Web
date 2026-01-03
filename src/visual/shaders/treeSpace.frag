precision highp float;

uniform float uTime;
uniform vec2 uResolution;
uniform vec2 uMouse;

/* ---------- Utility ---------- */

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);

  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));

  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

/* ---------- Shapes ---------- */

// vertical trunk
float trunkShape(vec2 p) {
  float width = 0.06;
  float taper = mix(1.0, 0.4, smoothstep(-0.2, 0.8, p.y));
  return exp(-abs(p.x) / (width * taper)) *
         smoothstep(-0.9, -0.1, p.y);
}

// branch arms
float branchShape(vec2 p, float dir) {
  vec2 q = p;
  q.x -= dir * (0.15 + p.y * 0.2);
  q.y -= 0.15;

  float angle = dir * 0.6;
  q = mat2(
    cos(angle), -sin(angle),
    sin(angle),  cos(angle)
  ) * q;

  float arm = exp(-abs(q.x) * 12.0) *
              smoothstep(0.0, 0.7, q.y) *
              smoothstep(1.0, 0.3, q.y);

  return arm;
}

/* ---------- Main ---------- */

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution.xy;
  vec2 p = uv * 2.0 - 1.0;

  // mouse energy
  vec2 m = uMouse * 2.0 - 1.0;
  float mouseEnergy = 1.0 / (length(p - m) * 4.0 + 1.0);

  /* ---------- Tree Structure ---------- */

  float trunk = trunkShape(p);
  float branches =
    branchShape(p, 1.0) +
    branchShape(p, -1.0);

  float canopy =
    smoothstep(0.3, 1.0, p.y) *
    noise(p * 4.0 + uTime * 0.15);

  float tree =
    trunk * 1.2 +
    branches * 0.9 +
    canopy * 0.4;

  tree += mouseEnergy * 0.5;

  /* ---------- Colors ---------- */

  vec3 rootColor   = vec3(0.02, 0.05, 0.10);
  vec3 trunkColor  = vec3(0.28, 0.20, 0.14);
  vec3 leafColor   = vec3(0.16, 0.50, 0.30);
  vec3 glowColor   = vec3(0.95, 0.55, 0.18);

  vec3 color = rootColor;
  color = mix(color, trunkColor, trunk);
  color += leafColor * canopy;
  color += glowColor * tree * 0.35;

  gl_FragColor = vec4(color, 1.0);
}
