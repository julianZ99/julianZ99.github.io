(function () {
  const canvas = document.getElementById('bg');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const pixelSize = 6;
  const gridSpacing = 8;
  const animationSpeed = 0.008;

  const resize = function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };

  resize();
  window.addEventListener('resize', resize);

  let cols = Math.ceil(canvas.width / gridSpacing);
  let rows = Math.ceil(canvas.height / gridSpacing);
  let pixels = [];

  function rebuildPixels() {
    cols = Math.ceil(canvas.width / gridSpacing);
    rows = Math.ceil(canvas.height / gridSpacing);

    pixels = [];

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        pixels.push({
          x: col * gridSpacing + gridSpacing / 2,
          y: row * gridSpacing + gridSpacing / 2,
        });
      }
    }
  }

  rebuildPixels();

  window.addEventListener('resize', function () {
    resize();
    rebuildPixels();
  });

  // -----------------------------
  // Perlin noise
  // -----------------------------

  var perm = new Array(256);

  for (var i = 0; i < 256; i++) {
    perm[i] = i;
  }

  for (var i = 255; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = perm[i];
    perm[i] = perm[j];
    perm[j] = tmp;
  }

  var p = perm.concat(perm);

  function fade(t) {
    return t * t * t * (t * (t * 6 - 15) + 10);
  }

  function lerp(t, a, b) {
    return a + t * (b - a);
  }

  function grad(hash, x, y) {
    var h = hash & 3;
    var u = h < 2 ? x : y;
    var v = h < 2 ? y : x;

    return ((h & 1) === 0 ? u : -u) +
      ((h & 2) === 0 ? v : -v);
  }

  function perlin(x, y) {
    var X = Math.floor(x) & 255;
    var Y = Math.floor(y) & 255;

    x -= Math.floor(x);
    y -= Math.floor(y);

    var u = fade(x);
    var v = fade(y);

    var aa = p[p[X] + Y];
    var ab = p[p[X] + Y + 1];
    var ba = p[p[X + 1] + Y];
    var bb = p[p[X + 1] + Y + 1];

    return lerp(
      v,
      lerp(u, grad(aa, x, y), grad(ba, x - 1, y)),
      lerp(u, grad(ab, x, y - 1), grad(bb, x - 1, y - 1))
    );
  }

  // -----------------------------
  // Colors
  // -----------------------------

  var style = getComputedStyle(document.documentElement);

  function hexToRgb(hex) {
    var r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

    return r
      ? {
          r: parseInt(r[1], 16),
          g: parseInt(r[2], 16),
          b: parseInt(r[3], 16)
        }
      : {
          r: 0,
          g: 0,
          b: 0
        };
  }

  var baseRgb = hexToRgb(
    style.getPropertyValue('--color-bg').trim()
  );

  var accentRgb = hexToRgb(
    style.getPropertyValue('--color-fg').trim()
  );

  // -----------------------------
  // Thunder system
  // -----------------------------

  var thunder = null;

  function trySpawnThunder(t) {
    if (thunder) return;

    //frequency of thunder
    if (Math.random() > 0.02) return;

    var cx = (0.08 + Math.random() * 0.84) * canvas.width;
    var cy = (0.05 + Math.random() * 0.55) * canvas.height;

    var nx = cx / 400;
    var ny = cy / 400;

    var n1 = perlin(nx + t, ny + t);

    var n2 = perlin(
      nx * 0.5 + t * 0.7,
      ny * 0.5 + t * 0.7
    );

    var density = ((n1 * 0.6 + n2 * 0.4) + 1) / 2;

    if (density < 0.2) return;

    var flashes = 1 + Math.floor(Math.random() * 4);

    var seq = [];

    for (var f = 0; f < flashes; f++) {

      // main flash
      seq.push({
        type: 'on',
        dur: 1 + Math.floor(Math.random() * 3),
        intensity: 0.8 + Math.random() * 0.45
      });

      seq.push({
        type: 'off',
        dur: 2 + Math.floor(Math.random() * 8)
      });

      // micro flash
      if (Math.random() < 0.4) {

        seq.push({
          type: 'on',
          dur: 1,
          intensity: 0.35 + Math.random() * 0.35
        });

        seq.push({
          type: 'off',
          dur: 1 + Math.floor(Math.random() * 4)
        });
      }
    }

    thunder = {
      seq: seq,
      seqIdx: 0,
      frameTick: 0,
      cx: cx,
      cy: cy,
      radius: 160 + Math.random() * 180
    };
  }

  function stepThunder() {
    if (!thunder) return;

    var seg = thunder.seq[thunder.seqIdx];

    if (!seg) {
      thunder = null;
      return;
    }

    thunder.frameTick++;

    if (thunder.frameTick >= seg.dur) {

      thunder.seqIdx++;
      thunder.frameTick = 0;

      if (thunder.seqIdx >= thunder.seq.length) {
        thunder = null;
      }
    }
  }

  function getThunderIntensity() {
    if (!thunder) return 0;

    var seg = thunder.seq[thunder.seqIdx];

    return (seg && seg.type === 'on')
      ? seg.intensity
      : 0;
  }

  // -----------------------------
  // Animation
  // -----------------------------

  var time = 0;
  var frame = 0;
  var running = true;

  var mq = window.matchMedia('(min-width: 768px)');

  function onMqChange(e) {
    running = e.matches;

    if (running) animate();
    else if (frame) cancelAnimationFrame(frame);
  }

  mq.addEventListener('change', onMqChange);

  if (!mq.matches) running = false;

  function animate() {
    if (!running) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    var t = time * animationSpeed;

    trySpawnThunder(t);
    stepThunder();

    var tIntensity = getThunderIntensity();

    for (var pi = 0; pi < pixels.length; pi++) {

      var px = pixels[pi];

      var x = px.x / 400;
      var y = px.y / 400;

      var n1 = perlin(x + t, y + t);

      var n2 = perlin(
        x * 0.5 + t * 0.7,
        y * 0.5 + t * 0.7
      );

      var combined = n1 * 0.6 + n2 * 0.4;

      var n = (combined + 1) / 2;

      if (n < 0.3) {
        n = 0;
      } else {
        n = (n - 0.3) / 0.7;
      }

      // -----------------------------
      // Thunder local falloff
      // -----------------------------

      var localBoost = 0;

      if (thunder && tIntensity > 0) {

        var dx = px.x - thunder.cx;
        var dy = px.y - thunder.cy;

        var dist = Math.sqrt(dx * dx + dy * dy);

        var warp =
          perlin(px.x * 0.01, px.y * 0.01) * 0.25;

        var radial = Math.max(
          0,
          1 - dist / (
            thunder.radius * (1 + warp)
          )
        );

        // smoothstep
        radial =
          radial * radial * (3 - 2 * radial);

        localBoost =
          tIntensity *
          radial *
          (0.35 + n * n);
      }

      // -----------------------------
      // Final appearance
      // -----------------------------

      var effectiveN = Math.min(
        1,
        n + localBoost * 2.8
      );

      var opacity = Math.pow(
        effectiveN,
        2.2
      );

      var cm = Math.min(
        1,
        0.3 +
        ((combined + 1) / 2) * 0.4 +
        localBoost * 0.45
      );

      var r = Math.floor(
        baseRgb.r +
        (accentRgb.r - baseRgb.r) * cm
      );

      var g = Math.floor(
        baseRgb.g +
        (accentRgb.g - baseRgb.g) * cm
      );

      var b = Math.floor(
        baseRgb.b +
        (accentRgb.b - baseRgb.b) * cm
      );

      var sz =
        pixelSize *
        (0.6 + ((combined + 1) / 2) * 0.4);

      ctx.fillStyle =
        'rgba(' +
        r + ',' +
        g + ',' +
        b + ',' +
        opacity +
        ')';

      ctx.fillRect(
        px.x - sz / 2,
        px.y - sz / 2,
        sz,
        sz
      );
    }

    time++;

    frame = requestAnimationFrame(animate);
  }

  if (running) animate();

  window.addEventListener('beforeunload', function () {
    if (frame) cancelAnimationFrame(frame);

    window.removeEventListener('resize', resize);
    mq.removeEventListener('change', onMqChange);
  });
})();