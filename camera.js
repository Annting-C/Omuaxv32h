const cameraView = document.getElementById('cameraView');
        const canvas = document.getElementById('canvas');

        if(navigator.mediaDevices &&navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({video: true }).then(function(stream){
                video.srcObject = stream;
                video.play()
            })
        }

        const ctx = canvas.getContext('2d');
        const toggleFilterBtn = document.getElementById('Take a Shot');
        const download = document.getElementById('download');
        let filterActive = false;
        let currentFrame = 0;
        const frameCount = 364; // 根據您的序列圖片數量調整
        const images = [];
              
        // 預加載序列圖片
        function preloadImages() {
            for (let i = 0; i < frameCount; i++) {
                const img = new Image();
                const paddedNumber = String(i).padStart(5, "0");
                img.src="Duck1/Duck1_" + paddedNumber + ".png"
                images.push(img);

            }
        }


        // 訪問相機
        async function setupCamera() {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
            cameraView.srcObject = stream;
            
        }

        // 應用圖片序列濾鏡
        function applySequenceFilter() {
           //if (!filterActive) return;
            
            canvas.width = 712;
            canvas.height = 1266;
            
            ctx.drawImage(cameraView, 0, 0, canvas.width, canvas.height);
            ctx.globalAlpha = 1; // 調整此值以改變濾鏡強度
            ctx.drawImage(images[currentFrame], 0, 0, canvas.width, canvas.height);
            ctx.globalAlpha = 1.0;
            
            currentFrame = (currentFrame + 1) % frameCount;
            
            requestAnimationFrame(applySequenceFilter);
        }

        // 切換濾鏡
       toggleFilterBtn.addEventListener('click', function() {
            filterActive = !filterActive;
            if (filterActive) {
                applySequenceFilter();
            }
        });

//javascript.js
function handleClick() {
    const anchor = document.createElement('a'); // <a> 元素 作為下載連結
    anchor.href = canvas.toDataURL('image/png'); //連結以 toDataURL() 設定格式
    anchor.download = 'image.png'; //給予 download 屬性決定檔名
    anchor.click(); //點擊效果
  }

        // 初始化
        preloadImages();
        setupCamera();
        cameraView.addEventListener('loadedmetadata', function() {
            canvas.width = cameraView.videoWidth;
            canvas.height = cameraView.videoHeight;
        
 
        });
