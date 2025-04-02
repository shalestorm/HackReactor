document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("bountyForm");
    const outputSection = document.getElementById("generatedPoster");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("characterName").value;
        const bounty = document.getElementById("bountyAmount").value;
        const imageInput = document.getElementById("posterImage").files[0];

        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const posterTemplate = new Image();
        posterTemplate.src = "imgs/onepiece-bounty-template.png";

        posterTemplate.onload = function () {

            const canvasWidth = 600;
            const canvasHeight = 900;
            canvas.width = canvasWidth;
            canvas.height = canvasHeight;


            if (imageInput) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    const userImage = new Image();
                    userImage.src = e.target.result;
                    userImage.onload = function () {
                        const imageAreaWidth = 500;
                        const imageAreaHeight = 420;
                        const imgWidth = imageAreaWidth;
                        const imgHeight = (userImage.height / userImage.width) * imgWidth;
                        ctx.drawImage(userImage, (canvas.width - imageAreaWidth) / 2, 190, imageAreaWidth, imageAreaHeight);
                        ctx.drawImage(posterTemplate, 0, 0, canvasWidth, canvasHeight);
                        ctx.save();
                        ctx.font = `bold 50px 'Times New Roman'`;
                        ctx.fillStyle = "black";
                        ctx.textAlign = "center";
                        ctx.save();
                        ctx.scale(1, 2.6);
                        ctx.fillText(name, canvas.width / 2, canvas.height - 620);
                        ctx.restore();
                        let fontSize = 50;
                        ctx.font = `bold ${fontSize}px 'Century Old Style'`;
                        let bountyText = parseInt(bounty).toLocaleString() + " –";
                        let textWidth = ctx.measureText(bountyText).width;
                        const maxTextWidth = canvas.width - 130;
                        ctx.setTransform(1, 0, 0, 1, 0, 0);
                        while (textWidth > maxTextWidth && fontSize > 10) {
                            fontSize -= 2;
                            ctx.font = `bold ${fontSize}px 'Century Old Style'`;
                            textWidth = ctx.measureText(bountyText).width;
                        }
                        const paddingRight = 25;
                        const textX = canvas.width / 2 + paddingRight;
                        ctx.fillText(bountyText, textX, canvas.height - 100);
                        displayPoster(canvas);
                    };
                };
                reader.readAsDataURL(imageInput);
            } else {
                ctx.drawImage(posterTemplate, 0, 0, canvasWidth, canvasHeight);
                ctx.save();
                ctx.font = "bold 50px 'Times New Roman', serif";
                ctx.fillStyle = "black";
                ctx.textAlign = "center";
                ctx.save();
                ctx.scale(1, 2.6);
                ctx.fillText(name, canvas.width / 2, canvas.height - 620);
                ctx.restore();
                let fontSize = 40;
                ctx.font = "bold ${fontSize} 'Century Old Style'";
                let bountyText = parseInt(bounty).toLocaleString() + " –";
                let textWidth = ctx.measureText(bountyText).width;
                const maxTextWidth = canvas.width - 130;
                ctx.setTransform(1, 0, 0, 1, 0, 0);
                while (textWidth > maxTextWidth && fontSize > 10) {
                    fontSize -= 2;
                    ctx.font = `bold ${fontSize}px 'Century Old Style'`;
                    textWidth = ctx.measureText(bountyText).width;
                }
                const paddingRight = 25;
                const textX = canvas.width / 2 + paddingRight;
                ctx.fillText(bountyText, textX, canvas.height - 100);
                displayPoster(canvas);
            }
        };
    });

    function displayPoster(canvas) {
        outputSection.innerHTML = ""; // Clear any previous content
        outputSection.appendChild(canvas);

        const downloadBtn = document.createElement("button");
        downloadBtn.textContent = "Download Poster";
        downloadBtn.addEventListener("click", function () {
            const link = document.createElement("a");
            link.download = "OnePieceBounty.png";
            link.href = canvas.toDataURL("image/png");
            link.click();
        });
        outputSection.appendChild(downloadBtn);

        // Show the generated poster section
        outputSection.style.display = "block";
    }
});
