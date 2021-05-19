unit uPrincipal;

{$mode objfpc}{$H+}

interface

uses
  Classes, SysUtils, Forms, Controls, Graphics, Dialogs, StdCtrls;

type

  { TformPrincipal }

  TformPrincipal = class(TForm)
    btMensagem: TButton;
    btSair: TButton;
    chkMostraSobrenome: TCheckBox;
    edNome: TEdit;
    edSobrenome: TEdit;
    Label1: TLabel;
    Label2: TLabel;
    procedure btMensagemClick(Sender: TObject);
    procedure btSairClick(Sender: TObject);
    procedure Label1Click(Sender: TObject);
  private

  public

  end;

var
  formPrincipal: TformPrincipal;

implementation

{$R *.lfm}

{ TformPrincipal }

procedure TformPrincipal.btMensagemClick(Sender: TObject);
begin
  if chkMostraSobrenome.Checked then
     ShowMessage('Olá, ' + edNome.Text + ' ' + edSobrenome.Text)
  else
     ShowMessage('Olá, ' + edNome.Text);
end;

procedure TformPrincipal.btSairClick(Sender: TObject);
begin
  ShowMessage('Até breve! ');
  Application.Terminate;
end;

procedure TformPrincipal.Label1Click(Sender: TObject);
begin

end;

end.

