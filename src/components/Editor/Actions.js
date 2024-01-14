import { CLEAR_EDITOR_COMMAND } from 'lexical'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { $generateHtmlFromNodes } from '@lexical/html';
import { useEffect } from 'react';

export function Actions({defaultState}) {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    const removeUpdateListener = editor.registerUpdateListener(
      ({ editorState }) => {
        editorState.read(() => {
          const htmlString = $generateHtmlFromNodes(editor, null);
          // console.log(htmlString)
        });
      }
    );
    return () => {
      removeUpdateListener();
    };
  }, [editor]);

  useEffect(() => {
    if (defaultState !== undefined) {
      editor.setEditorState(editor.parseEditorState(defaultState))
    }
  }, [defaultState])

  function handleOnSave() {
    console.log(JSON.stringify(editor.getEditorState()))
    editor.setEditorState(editor.parseEditorState(JSON.stringify(editor.getEditorState())))
  }

  function handleOnClear() {
    editor.dispatchCommand(CLEAR_EDITOR_COMMAND, undefined)
    editor.focus()
  }

  return (
    <div className="editor-actions hidden">
      <button onClick={handleOnSave}>Save</button>
      <button onClick={handleOnClear}>Clear</button>
    </div>)
}