// Define the class
class Video {
    constructor(title, uploader, time) {
        this.title = title;
        this.uploader = uploader;
        this.time = time;
    }

    watch() {
        console.log(`${this.uploader} watched all ${this.time} seconds of "${this.title}"!`);
    }
}

// 1. Instantiate a new Video instance
const video1 = new Video("JS Basics", "Alice", 300);
video1.watch();

// 2. Instantiate a second Video instance
const video2 = new Video("Advanced CSS", "Bob", 600);
video2.watch();

// Bonus: Data structure for 5 videos
const videoData = [
    { title: "React Tutorial", uploader: "Charlie", time: 1200 },
    { title: "Cooking Pasta", uploader: "Danielle", time: 450 },
    { title: "Workout Routine", uploader: "Erik", time: 900 },
    { title: "Travel Vlog", uploader: "Fiona", time: 1500 },
    { title: "Cat Videos", uploader: "George", time: 60 }
];

// Bonus: Loop through the array to instantiate and call watch()
const videoInstances = videoData.map(data => {
    const newVideo = new Video(data.title, data.uploader, data.time);
    newVideo.watch();
    return newVideo;
});