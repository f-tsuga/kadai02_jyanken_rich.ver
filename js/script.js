// =====================================
// 1. 診断ボタンを押したときの処理
// =====================================
// #check はHTMLのボタンのid
$("#check").on("click", function () {

    // =====================================
    // 2. 10問の回答を取得する
    // =====================================
    // :checked は選択されているラジオボタン
    // .val() はHTMLのvalueを取り出す
    const q1 = $('input[name="q1"]:checked').val();
    const q2 = $('input[name="q2"]:checked').val();
    const q3 = $('input[name="q3"]:checked').val();
    const q4 = $('input[name="q4"]:checked').val();
    const q5 = $('input[name="q5"]:checked').val();
    const q6 = $('input[name="q6"]:checked').val();
    const q7 = $('input[name="q7"]:checked').val();
    const q8 = $('input[name="q8"]:checked').val();
    const q9 = $('input[name="q9"]:checked').val();
    const q10 = $('input[name="q10"]:checked').val();

    // 開発者ツールのConsoleで回答を確認
    console.log("10問の回答:", q1, q2, q3, q4, q5, q6, q7, q8, q9, q10);

    // =====================================
    // 3. 未回答があれば診断を止める
    // =====================================
    if (q1 === undefined || q2 === undefined || q3 === undefined ||
        q4 === undefined || q5 === undefined || q6 === undefined ||
        q7 === undefined || q8 === undefined || q9 === undefined ||
        q10 === undefined) {
        $("#result").hide(); // 前回の結果があれば隠す
        $("#gacha").hide();
        alert("すべての質問に回答してください。");
        return; // ここで処理終了
    }

    // =====================================
    // 4. 5つの観点を採点する（各0～2点）
    // =====================================
    // .val()で取得した値は文字列なのでNumber()で数値に変換
    // 逆転項目はHTML側でNO=1、YES=0に設定済み
    const meaning = Number(q1) + Number(q2);       // 仕事の意義
    const growth = Number(q3) + Number(q4);        // 成長実感
    const strength = Number(q5) + Number(q6);      // 強みの発揮
    const autonomy = Number(q7) + Number(q8);      // 主体性
    const motivation = Number(q9) + Number(q10);   // 仕事への意欲

    // 総合点（0～10点）
    const score = meaning + growth + strength + autonomy + motivation;
    console.log("総合点:", score);
    console.log("5観点:", meaning, growth, strength, autonomy, motivation);

    // =====================================
    // 5. 総合点で3段階に分ける
    // =====================================
    // letは後から値を変更できる変数
    let level = "";
    let summary = "";

    if (score <= 3) {
        level = "LOW｜エンゲージメント低";
        summary = "今の仕事では、意欲や充実感を得にくい状態かもしれません。";
    } else if (score <= 7) {
        level = "MIDDLE｜エンゲージメント中";
        summary = "前向きな面と、見直したい面が混在しているようです。";
    } else {
        level = "HIGH｜エンゲージメント高";
        summary = "仕事に対して、比較的前向きに取り組めているようです。";
    }

    // =====================================
    // 6. 最も低い観点に合わせてアドバイスを選ぶ
    // =====================================
    // Math.min()で最も小さい数値を取得する
    const lowest = Math.min(meaning, growth, strength, autonomy, motivation);
    let weakPoint = "";
    let advice = "";

    if (lowest === 2) {
        // 全観点が満点のときは無理に改善点を作らない
        weakPoint = "すべての観点が良好";
        advice = "5つの観点すべてで前向きな回答でした。今の状態を支えている習慣を振り返り、これからも大切にしてみましょう。";
    } else if (lowest === meaning) {
        weakPoint = "仕事の意義";
        advice = "自分の仕事が誰の役に立っているかを考えてみましょう。仕事の目的を言葉にすることが、やりがいを見つめ直すきっかけになります。";
    } else if (lowest === growth) {
        weakPoint = "成長実感";
        advice = "最近できるようになったことを3つ書き出してみましょう。小さな学びを見つけることが、次の挑戦につながるかもしれません。";
    } else if (lowest === strength) {
        weakPoint = "強みの発揮";
        advice = "得意なことや周囲から感謝された経験を振り返りましょう。その強みを今の仕事で使える場面を1つ探してみてください。";
    } else if (lowest === autonomy) {
        weakPoint = "主体性";
        advice = "自分の裁量で変えられる仕事の進め方を1つ探してみましょう。小さな改善を自分で決めて試すことが第一歩です。";
    } else {
        weakPoint = "仕事への意欲";
        advice = "少しでも前向きになれる仕事や場面を振り返ってみましょう。無理に頑張るのではなく、意欲が生まれる条件を探すことから始めましょう。";
    }
    // 同点の観点がある場合は、上から先に一致した観点を採用
    console.log("最も低い観点:", weakPoint, "最低点:", lowest);

    // =====================================
    // 7. 横棒グラフを作る
    // =====================================
    // 各観点は2点満点なので、点数×50で横幅(%)を計算
    const bars = `
        <div class="bar-row"><span class="bar-label">仕事の意義</span><div class="bar-bg"><div class="bar-fill" style="width:${meaning * 50}%"></div></div><span class="bar-score">${meaning}/2</span></div>
        <div class="bar-row"><span class="bar-label">成長実感</span><div class="bar-bg"><div class="bar-fill" style="width:${growth * 50}%"></div></div><span class="bar-score">${growth}/2</span></div>
        <div class="bar-row"><span class="bar-label">強みの発揮</span><div class="bar-bg"><div class="bar-fill" style="width:${strength * 50}%"></div></div><span class="bar-score">${strength}/2</span></div>
        <div class="bar-row"><span class="bar-label">主体性</span><div class="bar-bg"><div class="bar-fill" style="width:${autonomy * 50}%"></div></div><span class="bar-score">${autonomy}/2</span></div>
        <div class="bar-row"><span class="bar-label">仕事への意欲</span><div class="bar-bg"><div class="bar-fill" style="width:${motivation * 50}%"></div></div><span class="bar-score">${motivation}/2</span></div>
    `;

    // =====================================
    // 8. 結果をHTMLに表示する
    // =====================================
    // ${...} は変数の中身を文章に埋め込む書き方
    const resultHTML = `
        <h2>YOUR RESULT</h2>
        <p class="score">${score} / 10</p>
        <p class="level">${level}</p>
        <p class="summary">${summary}</p>
        <h3>5つの観点</h3>
        ${bars}
        <div class="advice-box">
            <h3>${lowest === 2 ? "現在の良い状態" : "今回の注目ポイント：" + weakPoint}</h3>
            <p>${advice}</p>
        </div>
    `;

    $("#result").html(resultHTML); // 結果欄のHTMLを書き換える
    $("#result").show();           // 非表示だった結果欄を表示
    console.log("診断結果:", level);

    // 結果が画面の下にあるので、結果欄までスクロールする
    $("html, body").animate({ scrollTop: $("#result").offset().top - 20 }, 400);



// =====================================
// 9. 今日の一歩ガチャ
// =====================================

// 診断が完了したらガチャを表示する
$("#gacha").show();

// 前回のガチャ結果を隠す
$("#action-message").hide();

// ガチャボタンが押されたときの処理
$("#draw-action").off("click").on("click", function () {

    // 0・1・2のいずれかの乱数を作る
    const random = Math.floor(Math.random() * 3);

    // 表示するアクションを保存する変数
    let action = "";

    // 最も点数が低い観点によって分岐する

    if (weakPoint === "仕事の意義") {

        if (random === 0) {
            action = "自分の仕事が誰の役に立っているか考えてみよう";
        } else if (random === 1) {
            action = "今日の仕事で生み出した価値を1つ書いてみよう";
        } else {
            action = "仕事の目的について同僚と話してみよう";
        }

    } else if (weakPoint === "成長実感") {

        if (random === 0) {
            action = "今日学んだことを1つメモしてみよう";
        } else if (random === 1) {
            action = "いつもと違う仕事のやり方を試してみよう";
        } else {
            action = "最近できるようになったことを振り返ろう";
        }

    } else if (weakPoint === "強みの発揮") {

        if (random === 0) {
            action = "自分の得意なことを3つ書き出そう";
        } else if (random === 1) {
            action = "自分の強みを使って誰かを助けてみよう";
        } else {
            action = "最近感謝された仕事を思い出してみよう";
        }

    } else if (weakPoint === "主体性") {

        if (random === 0) {
            action = "自分で決められることを1つ見つけよう";
        } else if (random === 1) {
            action = "いつもの仕事の進め方を1つ変えてみよう";
        } else {
            action = "小さな改善案を1つ提案してみよう";
        }

    } else if (weakPoint === "仕事への意欲") {

        if (random === 0) {
            action = "今日少しでも楽しかった仕事を振り返ろう";
        } else if (random === 1) {
            action = "興味のあることを5分だけ調べてみよう";
        } else {
            action = "明日楽しみにできることを1つ考えよう";
        }

    } else {

        // 全観点が満点の場合
        if (random === 0) {
            action = "今の良い状態を支える習慣を1つ書き出そう";
        } else if (random === 1) {
            action = "自分の強みを誰かのために使ってみよう";
        } else {
            action = "次に挑戦したいことを1つ考えてみよう";
        }
    }

    // ガチャの結果を表示
    $("#action-message").text(action);
    $("#action-message").show();

    // コンソールで確認
    console.log("乱数:", random);
    console.log("今日の一歩:", action);

});
});
