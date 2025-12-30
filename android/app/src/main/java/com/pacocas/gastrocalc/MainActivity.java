package com.pacocas.gastrocalc;

import android.os.Bundle;
import android.webkit.WebSettings;
import androidx.activity.OnBackPressedCallback;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        
        // Forzar que el WebView ignore el tamaño de fuente configurado en el sistema Android
        WebSettings settings = this.bridge.getWebView().getSettings();
        settings.setTextZoom(100);

        // Manejo moderno del botón atrás para integrarlo con JavaScript
        getOnBackPressedDispatcher().addCallback(this, new OnBackPressedCallback(true) {
            @Override
            public void handleOnBackPressed() {
                String url = bridge.getWebView().getUrl();

                // Si estamos en la página principal, cerramos la aplicación
                if (url != null && (url.endsWith("/") || url.endsWith("index.html"))) {
                    finish();
                } else {
                    // Si estamos en cualquier otra página (como Calculagas.html), 
                    // enviamos un evento personalizado a JavaScript
                    bridge.getWebView().evaluateJavascript(
                        "window.dispatchEvent(new Event('hardwareBackPress'));", 
                        null
                    );
                }
            }
        });
    }
}
