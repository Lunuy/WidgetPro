/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import EvaluationTask from './src/tasks/EvaluationTask';

AppRegistry.registerHeadlessTask('EvaluationTask', () => EvaluationTask)
AppRegistry.registerComponent(appName, () => App);