function load_webgl(){
    "use strict"

    // register the application module
    b4w.register("Gravity", function(exports, require) {

        // import modules used by the app
        var m_app       = require("app");
        var m_data      = require("data");
        var m_cont          = require("container");
        var m_preloader = require("preloader");
        var PRELOADING = true;

        /**
        * export the method to initialize the app (called at the bottom of this file)
        */
        exports.init = function() {
            m_app.init({
                canvas_container_id: "main_canvas_container",
                callback: init_cb,
                show_fps: false,
                console_verbose: false,
                autoresize: true
            });
        }

        /**
        * callback executed when the app is initialized
        */
        function init_cb(canvas_elem, success) {

            if (!success) {
                return;
            }

            m_preloader.create_simple_preloader({
                bg_color: "#00000",
                bar_color: "#FF7E6D",
                background_container_id: "background_image_container",
                canvas_container_id: "main_canvas_container"
            });

            load();
        }

        /**
        * load the scene data
        */
        function load() {
            var p_cb = PRELOADING ? preloader_callback : null;
            m_data.load("Gravity.json", load_cb, p_cb, !true);
        }

        /**
        * callback executed when the scene is loaded
        */
        function load_cb(data_id) {
            m_app.enable_camera_controls();
            var canvas_elem = m_cont.get_canvas();

            canvas_elem.addEventListener("mouseup", function(e) {
                $("#control-message").hide();
            }, false);

            window.addEventListener("keydown", function(e){
                if(e.keyCode === 87  || e.keyCode === 83 || e.keyCode === 65 ||
                    e.keyCode === 68 ||  e.keyCode === 38 ||  e.keyCode === 40 ||
                    e.keyCode === 37 ||   e.keyCode === 39 && document.activeElement !== 'text') {
                        $("#control-message").hide();
                    }
                    if(e.keyCode === 72 && document.activeElement !== 'text') {
                        $("#control-message").show();
                    }
                });
            }



            function preloader_callback(percentage) {
                m_preloader.update_preloader(percentage);
            }


        });

        // import the app module and start the app by calling the init method
        b4w.require("Gravity").init();
    }
