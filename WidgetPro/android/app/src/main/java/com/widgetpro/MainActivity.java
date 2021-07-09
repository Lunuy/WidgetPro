package com.widgetpro;

import android.content.Intent;
import android.os.Bundle;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;

// https://stackoverflow.com/questions/39351650/react-native-android-get-the-variables-from-intent
class MainDelegate extends ReactActivityDelegate {
  public MainDelegate(ReactActivity activity, String mainComponentName) {
    super(activity, mainComponentName);
  }

  private Bundle params = new Bundle();

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    Bundle bundle = getPlainActivity().getIntent().getExtras();
    if(bundle != null)
      params = (Bundle)bundle.clone();
    super.onCreate(savedInstanceState);
  }

  @Override
  public boolean onNewIntent(Intent intent) {
    Bundle bundle = intent.getExtras();
    if(bundle != null)
      params = (Bundle)bundle.clone();
    return super.onNewIntent(intent);
  }

  @Override
  protected Bundle getLaunchOptions() {
    return params;
  }
}

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "WidgetPro";
  }

  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    return new MainDelegate(this, getMainComponentName());
  }
}
