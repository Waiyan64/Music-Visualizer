function NewVis() {
    this.name = "NewVis";
    var particles = []
    var vvv

    class Particle {
      constructor() {
        this.pos = p5.Vector.random2D().mult(250) 
        this.vel = createVector(0,0)
        this.acc = this.pos.copy().mult(random(0.0001, 0.00001))
        this.w = random(3, 5)

        this.color = [random(200, 255), random(200, 255), random(200, 255),]
      }
      update(cond) {
        this.vel.add(this.acc)
        this.pos.add(this.vel)
           if (cond) {
             this.pos.add(this.vel)
             this.pos.add(this.vel)
             this.pos.add(this.vel)
           }
        }
        edges() {
          if (this.pos.x < -width /2 || this.pos.x > width /2 || this.pos.y < -height /2 || this.pos.y > height /2) {
            return true 
          } else {
            return false
          }
        }
        show() {
          noStroke()
          fill(this.color)
          ellipse(this.pos.x+700, this.pos.y+300, 4)
        }
      
    }
    
    

    this.draw = function() {
        background('black')
        noFill()
        stroke(255)
        strokeWeight(3)
        let volume = amp.getLevel()
        let spectrum = fourier.analyze()
        let wave = fourier.waveform()
         vvv = fourier.getEnergy(20, 200)
        // translate(width / 2, height /2)


        if (volume >= 0.3) {
            stroke(random(255), random(255), random(255))
          }
          for (let t = -1; t <= 1; t += 2) {
            beginShape()
            for (let i = 0; i <= 180; i += 2) {
              let index = floor(map(i, 0, 180, 0, spectrum.length - 1))
              let r = map(spectrum[index], 0, 255, 200, 100)
              let x = r * sin(i) * t + 700
              let y = r * cos(i)  + 300
              vertex(x, y)
            }
            endShape()
        }

        if (volume >= 0.3) {
        stroke(random(255), random(255), random(255))
        }

        for (let t = -1; t <= 1; t += 2) {
        beginShape()
        for (let i = 0; i <= 180; i += 2) {
        let index = floor(map(i, 0, 180, 0, wave.length - 1))
        let r = map(wave[index], -1, 1, 150, 350)
        let x = r * sin(i) * t + 700
        let y = r * cos(i) + 300
        vertex(x, y)
        }
        endShape()
        }

        var p = new Particle()
        particles.push(p)

        for (var i = particles.length - 1; i >= 0; i--) {
          if (!particles[i].edges()) {
            particles[i].update(vvv > 230)
            particles[i].show()
          }
          else {
               particles.splice(i, 1)
           }
        }
      push()
      translate(700, 300)
      let circleSize = 40
       let gap = 10 + volume * 10
      for (let i = 1; i < 20; i++) {
        rotate(frameCount * 0.5 * volume)
        arc(0, 0, circleSize + gap * i, circleSize + gap * i, 45 * i, 45 * i + 50)
      }
      pop()
    
     }
  

}