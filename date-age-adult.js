/* =====================================
   Nurse-Tools date-age-adult.js
   日付・年齢早見
===================================== */


/* =====================
   グローバル
===================== */

let calendarYear = null;
let calendarMonth = null;

let targetCalendarYear = null;
let targetCalendarMonth = null;


/* =====================
   メインモード切替
   生年月日 / 日付
===================== */

function changeMainMode(mode){

    const birthSection =
        document.getElementById("birthSection");

    const dateSection =
        document.getElementById("dateSection");

    const birthMode =
        document.getElementById("birthMode");

    const dateMode =
        document.getElementById("dateMode");


    if(mode === "birth"){

        birthSection.classList.remove("hidden");
        dateSection.classList.add("hidden");

        birthMode.classList.add("active");
        dateMode.classList.remove("active");

    }else{

        birthSection.classList.add("hidden");
        dateSection.classList.remove("hidden");

        birthMode.classList.remove("active");
        dateMode.classList.add("active");

    }

}


/* =====================
   生年月日入力方式
   現在の年齢 / 西暦 / 和暦
===================== */

function changeBirthInputMode(mode){

    const currentAgeInput =
        document.getElementById("currentAgeInput");

    const westernInput =
        document.getElementById("westernInput");

    const japaneseInput =
        document.getElementById("japaneseInput");


    const currentAgeMode =
        document.getElementById("currentAgeMode");

    const westernMode =
        document.getElementById("westernMode");

    const japaneseMode =
        document.getElementById("japaneseMode");


    currentAgeInput.classList.add("hidden");
    westernInput.classList.add("hidden");
    japaneseInput.classList.add("hidden");

    currentAgeMode.classList.remove("active");
    westernMode.classList.remove("active");
    japaneseMode.classList.remove("active");


    if(mode === "currentAge"){

        currentAgeInput.classList.remove("hidden");
        currentAgeMode.classList.add("active");

    }else if(mode === "western"){

        westernInput.classList.remove("hidden");
        westernMode.classList.add("active");

    }else{

        japaneseInput.classList.remove("hidden");
        japaneseMode.classList.add("active");

    }

}


/* =====================
   日付計算モード
===================== */

function changeDateMode(mode){

    const differenceSection =
        document.getElementById("differenceSection");

    const targetSection =
        document.getElementById("targetSection");

    const differenceMode =
        document.getElementById("differenceMode");

    const targetMode =
        document.getElementById("targetMode");


    if(mode === "difference"){

        differenceSection.classList.remove("hidden");
        targetSection.classList.add("hidden");

        differenceMode.classList.add("active");
        targetMode.classList.remove("active");

    }else{

        differenceSection.classList.add("hidden");
        targetSection.classList.remove("hidden");

        differenceMode.classList.remove("active");
        targetMode.classList.add("active");

    }

}


/* =====================
   現在の年齢から
   生年月日を求める
===================== */

function getBirthDateFromCurrentAge(){

    const age =
        Number(
            document.getElementById("currentAge").value
        );


    const monthValue =
        document.getElementById("currentAgeMonth").value;

    const dayValue =
        document.getElementById("currentAgeDay").value;


    if(
        !Number.isInteger(age) ||
        age < 0 ||
        age > 150
    ){

        alert("正しい年齢を入力してください。");
        return null;

    }


    const today = new Date();

    today.setHours(0,0,0,0);


    /*
       誕生日が入力されていない場合

       年齢だけでは、
       誕生日を迎えた人と
       まだ迎えていない人の
       2通りが存在する。

       この場合は候補を別処理するため
       nullを返す。
    */

    if(
        monthValue === "" &&
        dayValue === ""
    ){

        return {
            type:"ageOnly",
            age:age
        };

    }


    if(
        monthValue === "" ||
        dayValue === ""
    ){

        alert("誕生日を入力する場合は、月と日を両方入力してください。");
        return null;

    }


    const month =
        Number(monthValue);

    const day =
        Number(dayValue);


    if(
        month < 1 ||
        month > 12 ||
        day < 1 ||
        day > 31
    ){

        alert("正しい誕生日を入力してください。");
        return null;

    }


    /*
       今年の誕生日
    */

    const birthdayThisYear =
        new Date(
            today.getFullYear(),
            month - 1,
            day
        );


    /*
       日付の妥当性確認
    */

    if(
        birthdayThisYear.getMonth() !== month - 1 ||
        birthdayThisYear.getDate() !== day
    ){

        alert("正しい誕生日を入力してください。");
        return null;

    }


    /*
       今年の誕生日を迎えているか
    */

    let birthYear =
        today.getFullYear() - age;


    if(today < birthdayThisYear){

        birthYear--;

    }


    const birth =
        new Date(
            birthYear,
            month - 1,
            day
        );


    return {
        type:"exact",
        date:birth
    };

}


/* =====================
   生年月日取得
===================== */

function getBirthDate(){

    const currentAgeVisible =
        !document
            .getElementById("currentAgeInput")
            .classList
            .contains("hidden");


    const westernVisible =
        !document
            .getElementById("westernInput")
            .classList
            .contains("hidden");


    /*
       現在の年齢
    */

    if(currentAgeVisible){

        return getBirthDateFromCurrentAge();

    }


    let year;
    let month;
    let day;


    /*
       西暦
    */

    if(westernVisible){

        year =
            Number(
                document.getElementById("westernYear").value
            );

        month =
            Number(
                document.getElementById("westernMonth").value
            );

        day =
            Number(
                document.getElementById("westernDay").value
            );

    }


    /*
       和暦
    */

    else{

        const era =
            document.getElementById("japaneseEra").value;

        const eraYear =
            Number(
                document.getElementById("japaneseYear").value
            );

        month =
            Number(
                document.getElementById("japaneseMonth").value
            );

        day =
            Number(
                document.getElementById("japaneseDay").value
            );


        if(era === "reiwa"){

            year = 2018 + eraYear;

        }else if(era === "heisei"){

            year = 1988 + eraYear;

        }else if(era === "showa"){

            year = 1925 + eraYear;

        }else if(era === "taisho"){

            year = 1911 + eraYear;

        }else if(era === "meiji"){

            year = 1867 + eraYear;

        }

    }


    if(
        !year ||
        !month ||
        !day
    ){

        alert("生年月日を入力してください。");
        return null;

    }


    const date =
        new Date(
            year,
            month - 1,
            day
        );


    if(
        date.getFullYear() !== year ||
        date.getMonth() !== month - 1 ||
        date.getDate() !== day
    ){

        alert("正しい日付を入力してください。");
        return null;

    }


    return {
        type:"exact",
        date:date
    };

}


/* =====================
   年齢計算
===================== */

function calculateAge(){

    const birthData =
        getBirthDate();


    if(!birthData) return;


    /*
       年齢だけ入力した場合
    */

    if(birthData.type === "ageOnly"){

        showAgeOnlyResult(
            birthData.age
        );

        return;

    }


    const birth =
        birthData.date;


    const today =
        new Date();

    today.setHours(0,0,0,0);


    let age =
        today.getFullYear() -
        birth.getFullYear();


    const birthday =
        new Date(
            today.getFullYear(),
            birth.getMonth(),
            birth.getDate()
        );


    if(today < birthday){

        age--;

    }


    /*
       次の誕生日
    */

    const nextBirthdayYear =
        today >= birthday
            ? today.getFullYear() + 1
            : today.getFullYear();


    const nextBirthday =
        new Date(
            nextBirthdayYear,
            birth.getMonth(),
            birth.getDate()
        );


    const diff =
        Math.round(
            (
                nextBirthday -
                today
            ) /
            (1000 * 60 * 60 * 24)
        );


    /*
       干支
    */

    const eto =
        getEto(birth.getFullYear());


    /*
       星座
    */

    const zodiac =
        getZodiac(
            birth.getMonth() + 1,
            birth.getDate()
        );


    document.getElementById("ageResult").innerHTML = `

        <div class="date-result-row">

            <div class="date-result-label">
                生年月日
            </div>

            <div class="date-result-value">
                ${formatDateJapanese(birth)}
            </div>

        </div>


        <div class="date-result-row">

            <div class="date-result-label">
                西暦
            </div>

            <div class="date-result-value">
                ${birth.getFullYear()}年
            </div>

        </div>


        <div class="date-result-row">

            <div class="date-result-label">
                和暦
            </div>

            <div class="date-result-value">
                ${toJapaneseEra(birth)}
            </div>

        </div>


        <div class="date-result-row">

            <div class="date-result-label">
                現在の年齢
            </div>

            <div class="date-result-value">
                ${age}歳
            </div>

        </div>


        <div class="date-result-row">

            <div class="date-result-label">
                干支
            </div>

            <div class="date-result-value">
                ${eto.emoji} ${eto.name}（${eto.reading}）
            </div>

        </div>


        <div class="date-result-row">

            <div class="date-result-label">
                星座
            </div>

            <div class="date-result-value">
                ${zodiac.emoji}
                ${zodiac.name}
                （${zodiac.reading}／${zodiac.english}）
            </div>

        </div>


        <div class="date-result-row">

            <div class="date-result-label">
                次の誕生日まで
            </div>

            <div class="date-result-value">
                あと${diff}日
            </div>

        </div>

    `;


    document.getElementById("ageResultCard")
        .style.display = "block";


    /*
       正確な誕生日が分かる場合のみ
       年齢早見表を作成
    */

    createAgeTable(
        birth,
        age
    );

}


/* =====================
   年齢だけ入力した場合
===================== */

function showAgeOnlyResult(age){

    const today =
        new Date();

    const yearAfterBirthday =
        today.getFullYear() - age;

    const yearBeforeBirthday =
        yearAfterBirthday - 1;


    document.getElementById("ageResult").innerHTML = `

        <div class="date-result-row">

            <div class="date-result-label">
                現在の年齢
            </div>

            <div class="date-result-value">
                ${age}歳
            </div>

        </div>


        <div class="date-result-row">

            <div class="date-result-label">
                誕生日を迎えた場合
            </div>

            <div class="date-result-value">
                ${yearAfterBirthday}年生まれ
            </div>

        </div>


        <div class="date-result-row">

            <div class="date-result-label">
                まだ誕生日を迎えていない場合
            </div>

            <div class="date-result-value">
                ${yearBeforeBirthday}年生まれ
            </div>

        </div>

    `;


    document.getElementById("ageResultCard")
        .style.display = "block";


    /*
       誕生日が不明なので、
       正確な年齢早見表は作らない。
    */

    document.getElementById("ageTableCard")
        .style.display = "none";

}


/* =====================
   干支
===================== */

function getEto(year){

    const eto = [

        {
            name:"子",
            reading:"ね",
            emoji:"🐭"
        },

        {
            name:"丑",
            reading:"うし",
            emoji:"🐮"
        },

        {
            name:"寅",
            reading:"とら",
            emoji:"🐯"
        },

        {
            name:"卯",
            reading:"う",
            emoji:"🐰"
        },

        {
            name:"辰",
            reading:"たつ",
            emoji:"🐲"
        },

        {
            name:"巳",
            reading:"み",
            emoji:"🐍"
        },

        {
            name:"午",
            reading:"うま",
            emoji:"🐴"
        },

        {
            name:"未",
            reading:"ひつじ",
            emoji:"🐑"
        },

        {
            name:"申",
            reading:"さる",
            emoji:"🐵"
        },

        {
            name:"酉",
            reading:"とり",
            emoji:"🐔"
        },

        {
            name:"戌",
            reading:"いぬ",
            emoji:"🐶"
        },

        {
            name:"亥",
            reading:"い",
            emoji:"🐗"
        }

    ];


    return eto[
        (year - 4) % 12
    ];

}


/* =====================
   星座
===================== */

function getZodiac(month, day){

    const zodiacList = [

        {
            name:"山羊座",
            reading:"やぎざ",
            english:"カプリコーン",
            emoji:"♑",
            start:[12,22],
            end:[1,19]
        },

        {
            name:"水瓶座",
            reading:"みずがめざ",
            english:"アクエリアス",
            emoji:"♒",
            start:[1,20],
            end:[2,18]
        },

        {
            name:"魚座",
            reading:"うおざ",
            english:"パイシーズ",
            emoji:"♓",
            start:[2,19],
            end:[3,20]
        },

        {
            name:"牡羊座",
            reading:"おひつじざ",
            english:"アリエス",
            emoji:"♈",
            start:[3,21],
            end:[4,19]
        },

        {
            name:"牡牛座",
            reading:"おうしざ",
            english:"タウラス",
            emoji:"♉",
            start:[4,20],
            end:[5,20]
        },

        {
            name:"双子座",
            reading:"ふたござ",
            english:"ジェミニ",
            emoji:"♊",
            start:[5,21],
            end:[6,21]
        },

        {
            name:"蟹座",
            reading:"かにざ",
            english:"キャンサー",
            emoji:"♋",
            start:[6,22],
            end:[7,22]
        },

        {
            name:"獅子座",
            reading:"ししざ",
            english:"レオ",
            emoji:"♌",
            start:[7,23],
            end:[8,22]
        },

        {
            name:"乙女座",
            reading:"おとめざ",
            english:"バルゴ",
            emoji:"♍",
            start:[8,23],
            end:[9,22]
        },

        {
            name:"天秤座",
            reading:"てんびんざ",
            english:"リブラ",
            emoji:"♎",
            start:[9,23],
            end:[10,23]
        },

        {
            name:"蠍座",
            reading:"さそりざ",
            english:"スコーピオ",
            emoji:"♏",
            start:[10,24],
            end:[11,22]
        },

        {
            name:"射手座",
            reading:"いてざ",
            english:"サジタリアス",
            emoji:"♐",
            start:[11,23],
            end:[12,21]
        }

    ];


    for(const zodiac of zodiacList){

        const startMonth =
            zodiac.start[0];

        const startDay =
            zodiac.start[1];

        const endMonth =
            zodiac.end[0];

        const endDay =
            zodiac.end[1];


        /*
           山羊座だけ12月→1月
        */

        if(startMonth === 12){

            if(
                (month === 12 && day >= startDay) ||
                (month === 1 && day <= endDay)
            ){

                return zodiac;

            }

        }else{

            if(
                (
                    month === startMonth &&
                    day >= startDay
                ) ||
                (
                    month === endMonth &&
                    day <= endDay
                ) ||
                (
                    month > startMonth &&
                    month < endMonth
                )
            ){

                return zodiac;

            }

        }

    }


    return zodiacList[0];

}


/* =====================
   和暦
===================== */

function toJapaneseEra(date){

    const y =
        date.getFullYear();

    const m =
        date.getMonth() + 1;

    const d =
        date.getDate();


    if(
        y > 2019 ||
        (
            y === 2019 &&
            (m > 5 || (m === 5 && d >= 1))
        )
    ){

        return "令和" +
            (y - 2018) +
            "年";

    }


    if(
        y > 1989 ||
        (
            y === 1989 &&
            (m > 1 || (m === 1 && d >= 8))
        )
    ){

        return "平成" +
            (y - 1988) +
            "年";

    }


    if(
        y > 1926 ||
        (
            y === 1926 &&
            (m > 12 || (m === 12 && d >= 25))
        )
    ){

        return "昭和" +
            (y - 1925) +
            "年";

    }


    if(
        y > 1912 ||
        (
            y === 1912 &&
            (m > 7 || (m === 7 && d >= 30))
        )
    ){

        return "大正" +
            (y - 1911) +
            "年";

    }


    if(y >= 1868){

        return "明治" +
            (y - 1867) +
            "年";

    }


    return "";

}


/* =====================
   日付表示
===================== */

function formatDateJapanese(date){

    return `${date.getFullYear()}年${date.getMonth()+1}月${date.getDate()}日`;

}


function formatDate(date){

    return `${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()}`;

}


/* =====================
   年齢早見表
===================== */

function createAgeTable(
    birth,
    currentAge
){

    const tbody =
        document.getElementById(
            "ageTableBody"
        );


    tbody.innerHTML = "";


    const startAge =
        Math.max(
            0,
            currentAge - 10
        );


    const endAge =
        currentAge + 10;


    for(
        let age = startAge;
        age <= endAge;
        age++
    ){

        const date =
            createAgeDate(
                birth,
                age
            );


        const tr =
            document.createElement("tr");


        if(age === currentAge){

            tr.className =
                "current";

        }


        tr.innerHTML = `

            <td>
                ${date.getFullYear()}年
            </td>

            <td>
                ${toJapaneseEra(date)}
            </td>

            <td>
                ${age}歳
            </td>

        `;


        tbody.appendChild(tr);

    }


    createMilestoneTable(birth);


    document.getElementById("ageTableCard")
        .style.display = "block";

}


/* =====================
   年齢から日付作成
===================== */

function createAgeDate(
    birth,
    age
){

    const year =
        birth.getFullYear() + age;

    const month =
        birth.getMonth();

    const day =
        birth.getDate();


    const date =
        new Date(
            year,
            month,
            day
        );


    /*
       2月29日生まれ
    */

    if(
        month === 1 &&
        day === 29 &&
        date.getMonth() !== 1
    ){

        return new Date(
            year,
            1,
            28
        );

    }


    return date;

}


/* =====================
   人生の節目
===================== */

function createMilestoneTable(birth){

    const tbody =
        document.getElementById(
            "milestoneTableBody"
        );


    tbody.innerHTML = "";


    const milestones = [

        [0, "誕生"],

        [6, "小学校入学"],

        [12, "小学校卒業"],

        [13, "中学校入学"],

        [15, "中学校卒業"],

        [16, "高校入学"],

        [18, "高校卒業"],

        [18, "成人年齢"],

        [18, "大学入学"],

        [20, "成人の節目"],

        [22, "大学卒業（4年制）"],

        [60, "還暦"],

        [70, "古希"],

        [77, "喜寿"],

        [80, "傘寿"],

        [88, "米寿"],

        [90, "卒寿"],

        [99, "白寿"],

        [100, "百寿"]

    ];


    milestones.forEach(
        milestone => {

            const age =
                milestone[0];

            const label =
                milestone[1];


            const date =
                createAgeDate(
                    birth,
                    age
                );


            const tr =
                document.createElement("tr");


            tr.innerHTML = `

                <td>
                    ${date.getFullYear()}年
                </td>

                <td>
                    ${toJapaneseEra(date)}
                </td>

                <td>
                    ${age}歳
                </td>

                <td>
                    ${label}
                </td>

            `;


            tbody.appendChild(tr);

        }
    );

}


/* =====================
   日付差
===================== */

function calculateDifference(){

    const startValue =
        document.getElementById(
            "startDate"
        ).value;


    const endValue =
        document.getElementById(
            "endDate"
        ).value;


    if(
        !startValue ||
        !endValue
    ){

        alert("基準日と指定日を入力してください。");
        return;

    }


    const start =
        createDateFromValue(
            startValue
        );


    const end =
        createDateFromValue(
            endValue
        );


    const diff =
        Math.round(
            (
                end - start
            ) /
            (1000 * 60 * 60 * 24)
        );


    let dayText;


    if(diff > 0){

        dayText =
            `${diff}日後`;

    }else if(diff < 0){

        dayText =
            `${Math.abs(diff)}日前`;

    }else{

        dayText =
            "0日";

    }


    /*
       基準日を1日目
    */

    const dayCount =
        diff + 1;


    document.getElementById(
        "differenceResult"
    ).innerHTML = `

        <div class="date-result-row">

            <div class="date-result-label result-start">
                ○ 基準日（青）
            </div>

            <div class="date-result-value">
                ${formatDateJapanese(start)}
            </div>

        </div>


        <div class="date-result-row">

            <div class="date-result-label result-end">
                ○ 指定日（赤）
            </div>

            <div class="date-result-value">
                ${formatDateJapanese(end)}
            </div>

        </div>


        <div class="date-result-row">

            <div class="date-result-label">
                日数
            </div>

            <div class="date-result-value">
                ${dayText}
            </div>

        </div>


        <div class="date-result-row">

            <div class="date-result-label">
                何日分
            </div>

            <div class="date-result-value">
                ${dayCount}日分
            </div>

        </div>

    `;


    document.getElementById(
        "differenceResultCard"
    ).style.display = "block";


    calendarYear =
        start.getFullYear();

    calendarMonth =
        start.getMonth();


    document.getElementById(
        "differenceCalendarCard"
    ).style.display = "block";


    renderDifferenceCalendar();

}


/* =====================
   指定日計算
===================== */

function calculateTargetDate(){

    const baseValue =
        document.getElementById(
            "baseDate"
        ).value;


    const daysValue =
        document.getElementById(
            "targetDays"
        ).value;


    const direction =
        document.getElementById(
            "targetDirection"
        ).value;


    if(
        !baseValue ||
        daysValue === ""
    ){

        alert("基準日と日数を入力してください。");
        return;

    }


    const baseDate =
        createDateFromValue(
            baseValue
        );


    const days =
        Number(daysValue);


    if(
        !Number.isFinite(days) ||
        days < 0
    ){

        alert("正しい日数を入力してください。");
        return;

    }


    const targetDate =
        new Date(baseDate);


    if(direction === "after"){

        targetDate.setDate(
            targetDate.getDate() + days
        );

    }else{

        targetDate.setDate(
            targetDate.getDate() - days
        );

    }


    document.getElementById(
        "targetResult"
    ).innerHTML = `

        <div class="date-result-row">

            <div class="date-result-label result-start">
                ○ 基準日（青）
            </div>

            <div class="date-result-value">
                ${formatDateJapanese(baseDate)}
            </div>

        </div>


        <div class="date-result-row">

            <div class="date-result-label result-end">
                ○ 指定日（赤）
            </div>

            <div class="date-result-value">
                ${formatDateJapanese(targetDate)}
            </div>

        </div>

    `;


    document.getElementById(
        "targetResultCard"
    ).style.display = "block";


    targetCalendarYear =
        baseDate.getFullYear();

    targetCalendarMonth =
        baseDate.getMonth();


    document.getElementById(
        "targetCalendarCard"
    ).style.display = "block";


    renderTargetCalendar(
        baseDate,
        targetDate
    );

}


/* =====================
   日付生成
===================== */

function createDateFromValue(value){

    return new Date(
        value + "T00:00:00"
    );

}


/* =====================
   日数カレンダー
===================== */

function renderDifferenceCalendar(){

    const body =
        document.getElementById(
            "calendarBody"
        );


    body.innerHTML = "";


    document.getElementById(
        "calendarTitle"
    ).textContent =
        `${calendarYear}年${calendarMonth + 1}月`;


    const start =
        createDateFromValue(
            document.getElementById(
                "startDate"
            ).value
        );


    const end =
        createDateFromValue(
            document.getElementById(
                "endDate"
            ).value
        );


    renderCalendarBody(
        body,
        calendarYear,
        calendarMonth,
        start,
        end
    );

}


/* =====================
   指定日カレンダー
===================== */

function renderTargetCalendar(
    baseDate,
    targetDate
){

    const body =
        document.getElementById(
            "targetCalendarBody"
        );


    body.innerHTML = "";


    document.getElementById(
        "targetCalendarTitle"
    ).textContent =
        `${targetCalendarYear}年${targetCalendarMonth + 1}月`;


    renderCalendarBody(
        body,
        targetCalendarYear,
        targetCalendarMonth,
        baseDate,
        targetDate
    );

}


/* =====================
   カレンダー本体
===================== */

function renderCalendarBody(
    body,
    year,
    month,
    startDate,
    endDate
){

    const firstDay =
        new Date(
            year,
            month,
            1
        ).getDay();


    const lastDate =
        new Date(
            year,
            month + 1,
            0
        ).getDate();


    const startString =
        dateToString(startDate);


    const endString =
        dateToString(endDate);


    let row =
        document.createElement("tr");


    for(
        let i = 0;
        i < firstDay;
        i++
    ){

        const td =
            document.createElement("td");

        td.className =
            "empty";

        row.appendChild(td);

    }


    for(
        let day = 1;
        day <= lastDate;
        day++
    ){

        if(
            (firstDay + day - 1) % 7 === 0 &&
            row.children.length > 0
        ){

            body.appendChild(row);

            row =
                document.createElement("tr");

        }


        const td =
            document.createElement("td");


        td.textContent =
            day;


        const date =
            new Date(
                year,
                month,
                day
            );


        const dateString =
            dateToString(date);


        if(
            dateString === startString
        ){

            td.classList.add(
                "selected-start"
            );

        }


        if(
            dateString === endString
        ){

            td.classList.add(
                "selected-end"
            );

        }


        const today =
            new Date();

        today.setHours(0,0,0,0);


        if(
            date.getTime() ===
            today.getTime()
        ){

            td.classList.add(
                "today"
            );

        }


        row.appendChild(td);

    }


    while(
        row.children.length < 7
    ){

        const td =
            document.createElement("td");

        td.className =
            "empty";

        row.appendChild(td);

    }


    body.appendChild(row);

}


/* =====================
   日付文字列
===================== */

function dateToString(date){

    return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,"0")}-${String(date.getDate()).padStart(2,"0")}`;

}


/* =====================
   日数カレンダー移動
===================== */

function changeCalendarMonth(amount){

    calendarMonth += amount;


    if(calendarMonth < 0){

        calendarMonth = 11;
        calendarYear--;

    }


    if(calendarMonth > 11){

        calendarMonth = 0;
        calendarYear++;

    }


    renderDifferenceCalendar();

}


/* =====================
   指定日カレンダー移動
===================== */

function changeTargetCalendarMonth(amount){

    targetCalendarMonth += amount;


    if(targetCalendarMonth < 0){

        targetCalendarMonth = 11;
        targetCalendarYear--;

    }


    if(targetCalendarMonth > 11){

        targetCalendarMonth = 0;
        targetCalendarYear++;

    }


    const baseDate =
        createDateFromValue(
            document.getElementById(
                "baseDate"
            ).value
        );


    const days =
        Number(
            document.getElementById(
                "targetDays"
            ).value
        );


    const direction =
        document.getElementById(
            "targetDirection"
        ).value;


    const targetDate =
        new Date(baseDate);


    if(direction === "after"){

        targetDate.setDate(
            targetDate.getDate() + days
        );

    }else{

        targetDate.setDate(
            targetDate.getDate() - days
        );

    }


    renderTargetCalendar(
        baseDate,
        targetDate
    );

}