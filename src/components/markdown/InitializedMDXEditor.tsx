'use client'
// InitializedMDXEditor.tsx
import type { ForwardedRef } from 'react'
import {
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  markdownShortcutPlugin,
  MDXEditor,
  toolbarPlugin,
  type MDXEditorMethods,
  type MDXEditorProps,
  UndoRedo,
  BoldItalicUnderlineToggles,
  ChangeCodeMirrorLanguage,
  CreateLink,
  linkDialogPlugin,
  InsertCodeBlock,
  linkPlugin,
  codeBlockPlugin,
  sandpackPlugin,
  codeMirrorPlugin,
  ConditionalContents,
  ShowSandpackInfo,
  InsertSandpack,
  SandpackConfig,
  tablePlugin,
  InsertTable,
  ALL_HEADING_LEVELS
} from '@mdxeditor/editor'
import '@mdxeditor/editor/style.css';

// const defaultSnippetContent = `
// export default function App() {
//   return (
//     <div className="App">
//       <h1>Hello CodeSandbox</h1>
//       <h2>Start editing to see some magic happen!</h2>
//     </div>
//   );
// }
// `.trim()

// const simpleSandpackConfig: SandpackConfig = {
//   defaultPreset: 'react',
//   presets: [
//     {
//       label: 'React',
//       name: 'react',
//       meta: 'live react',
//       sandpackTemplate: 'react',
//       sandpackTheme: 'light',
//       snippetFileName: '/App.js',
//       snippetLanguage: 'jsx',
//       initialSnippetContent: defaultSnippetContent
//     },
//   ]
// }

// Only import this to the next file
export default function InitializedMDXEditor({
  editorRef,
  ...props
}: { editorRef: ForwardedRef<MDXEditorMethods> | null } & MDXEditorProps) {
  return (
    <MDXEditor
      plugins={[
        // Example Plugin Usage
        headingsPlugin(),
        listsPlugin(),
        quotePlugin(),
        thematicBreakPlugin(),
        markdownShortcutPlugin(),
        linkDialogPlugin(),
        linkPlugin(),
        tablePlugin(),
        markdownShortcutPlugin(),
        toolbarPlugin({
          toolbarContents: () => (
            <>
              {' '}
              <UndoRedo />
              <BoldItalicUnderlineToggles />
              <CreateLink/>
              <InsertTable/>
            </>
          )
        })
      ]}
      {...props}
      ref={editorRef}
    />
  )
}