import { createAction } from 'redux-actions';
import File from '../util/file';

/**
 * @file home action
 */

const Project_Init = 'Project_Init';
const File_Int= 'File_Int';

export default {
  types: {
    Project_Init,
    File_Int
  },
  initProject: createAction(Project_Init),
  initFile: createAction(File_Int, function(path: string) {
    return File.findFiles(path);
  })
};
