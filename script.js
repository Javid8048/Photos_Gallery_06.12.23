document.documentElement.querySelector("head").querySelector("title").innerText = "Dragging Javid Photos";

let highestZ = 1;

class Paper {

    holdingPaper = false;

    prevMouseX = 0;
    prevMouseY = 0;

    mouseX = 0;
    mouseY = 0;

    velocityX = 0;
    velocityY = 0;

    currentPaperX = 0;
    currentPaperY = 0;

    init(paper) {
        if(window.screen.width > 400) {
            paper.addEventListener("mousedown", e => {
                this.holdingPaper = true;
                paper.style.zIndex = highestZ;
                highestZ++;
                if (e.button === 0) {
                    this.prevMouseX = this.mouseX;
                    this.prevMouseY = this.mouseY;
                }
            })
    
            document.addEventListener("mousemove", e => {
                this.mouseX = e.clientX;
                this.mouseY = e.clientY;
                this.velocityX = this.mouseX - this.prevMouseX;
                this.velocityY = this.mouseY - this.prevMouseY;
    
                if (this.holdingPaper) {
                    this.currentPaperX += this.velocityX;
                    this.currentPaperY += this.velocityY;
    
                    this.prevMouseX = this.mouseX;
                    this.prevMouseY = this.mouseY;
    
                    paper.style.transform = `translateX(${this.currentPaperX}px) translateY(${this.currentPaperY}px)`;
                }
            });
    
            window.addEventListener("mouseup", e => {
                this.holdingPaper = false;
            })
        }
        else {
            paper.addEventListener("touchstart", e => {
                console.log(e);
                this.holdingPaper = true;
                paper.style.zIndex = highestZ;
                highestZ++;
                this.prevMouseX = this.mouseX;
                this.prevMouseY = this.mouseY;
            })
    
            document.addEventListener("touchmove", e => {
                this.mouseX = e.changedTouches[0].clientX;
                this.mouseY = e.changedTouches[0].clientY;
                this.velocityX = this.mouseX - this.prevMouseX;
                this.velocityY = this.mouseY - this.prevMouseY;
    
                if (this.holdingPaper) {
                    this.currentPaperX += this.velocityX;
                    this.currentPaperY += this.velocityY;
    
                    this.prevMouseX = this.mouseX;
                    this.prevMouseY = this.mouseY;
    
                    paper.style.transform = `translateX(${this.currentPaperX - 10}px) translateY(${this.currentPaperY - 10}px)`;
                    console.log(paper.style.transform)
                }
            })
    
            window.addEventListener("touchend", e => {
                this.holdingPaper = false;
            })
        }

    }
}

const papers = Array.from(document.querySelectorAll(".paper"))
papers.forEach(paper => {
    const p = new Paper();
    p.init(paper);
})