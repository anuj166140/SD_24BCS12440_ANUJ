const attendance = { dsa:82, oops:68, math:90, ml:73 };

// ================= CHARTS =================
function createChart(id,val){
    let color = val<75?"#ef4444":val<85?"#f59e0b":"#10b981";

    new Chart(document.getElementById(id),{
        type:'doughnut',
        data:{datasets:[{data:[val,100-val],backgroundColor:[color,"#e5e7eb"]}]},
        options:{cutout:"70%",plugins:{legend:{display:false}}},
        plugins:[{
            beforeDraw(chart){
                const ctx=chart.ctx;
                ctx.font="bold 14px sans-serif";
                ctx.textAlign="center";
                ctx.fillText(val+"%",chart.width/2,chart.height/2);
            }
        }]
    });
}

// Only create charts if dashboard exists
if(document.getElementById("dsaChart")){
    createChart("dsaChart",attendance.dsa);
    createChart("oopsChart",attendance.oops);
    createChart("mathChart",attendance.math);
    createChart("mlChart",attendance.ml);

    const overall=(Object.values(attendance)
        .reduce((a,b)=>a+b)/4).toFixed(1);

    document.getElementById("overallText").innerText=
        "Overall Attendance: "+overall+"%";

    const badge=document.getElementById("riskBadge");
    badge.innerText=overall<75?"HIGH RISK":
                    overall<85?"MEDIUM RISK":"LOW RISK";

    badge.style.background=overall<75?"red":
                           overall<85?"orange":"green";
}

// ================= 3D TILT (ONLY DASHBOARD) =================
if(document.querySelector(".subject-card")){
    document.querySelectorAll(".subject-card").forEach(card=>{
        card.addEventListener("mousemove",(e)=>{
            const rect=card.getBoundingClientRect();
            const x=e.clientX-rect.left;
            const y=e.clientY-rect.top;
            const rotateX=-(y-rect.height/2)/15;
            const rotateY=(x-rect.width/2)/15;
            card.style.transform=`rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        card.addEventListener("mouseleave",()=>{
            card.style.transform="rotateX(0) rotateY(0)";
        });

        card.addEventListener("click",()=>{
            document.querySelectorAll(".subject-card")
            .forEach(c=>c.classList.remove("active"));
            card.classList.add("active");
        });
    });
}

// ================= LEAVE PAGE FIX =================
if(document.querySelector(".leave-card")){
    document.querySelectorAll(".leave-card").forEach(card=>{
        card.addEventListener("click",()=>{
            document.querySelectorAll(".leave-card")
            .forEach(c=>c.classList.remove("active"));
            card.classList.add("active");
        });
    });
}

function submitLeave(){
    const start=document.getElementById("startDate")?.value;
    const end=document.getElementById("endDate")?.value;
    const reason=document.getElementById("reason")?.value;

    if(!start||!end||!reason){
        alert("Fill all fields");
        return;
    }

    document.getElementById("leavePreview").innerHTML=
        "<p style='color:green'>Leave Applied Successfully ✅</p>";
}

// ================= CALENDAR =================
if(document.getElementById("calendar")){
    document.addEventListener("DOMContentLoaded",function(){
        const calendar=new FullCalendar.Calendar(
            document.getElementById("calendar"),
            {
                initialView:"dayGridMonth",
                events:[
                    {title:"DSA Internal",date:"2026-02-25"},
                    {title:"Math Assignment",date:"2026-02-28"},
                    {title:"ML Viva",date:"2026-03-03"}
                ]
            }
        );
        calendar.render();
    });
}