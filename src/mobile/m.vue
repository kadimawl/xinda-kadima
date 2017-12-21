<template>
    <div class="routerBox">
        <!-- 这是wx端一级路由，所有wx端都挂这下面 -->
        <router-view/>
    </div>
</template>

<script>
  (function(doc, win) {
    var docEl = doc.documentElement,
      resizeEvt =
        "orientationchange" in window ? "orientationchange" : "resize",
      recalc = function() {
        var clientWidth = docEl.clientWidth;
        if (!clientWidth) return;
        if (clientWidth >= 750) {
          docEl.style.fontSize = "100px";
        } else {
          docEl.style.fontSize = 100 * (clientWidth / 750) + "px";
        }
      };

    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener("DOMContentLoaded", recalc, false);
  })(document, window);

export default {
  
};
</script>

<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
}
.routerBox{
  max-width: 768px;
  max-width: 1280px;
  margin: auto;
}

</style>
