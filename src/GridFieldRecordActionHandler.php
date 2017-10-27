<?php

namespace Symbiote\GridFieldExtensions;

use SilverStripe\Control\RequestHandler;
use SilverStripe\Forms\GridField\GridField;
use SilverStripe\ORM\DataObjectInterface;
use SilverStripe\Control\HTTPRequest;
use SilverStripe\Security\Security;
use SilverStripe\Control\Controller;
use SilverStripe\ORM\ValidationResult;

class GridFieldRecordActionHandler extends RequestHandler
{

    private static $allowed_actions = [
        'publish',
        'unpublish',
        'archive'
    ];

    private static $url_handlers = [
        '$Action!' => '$Action'
    ];

    protected $record = null;

    public function __construct(GridField $gridField, DataObjectInterface $record)
    {
        $this->gridField = $gridField;
        $this->record = $record;
        parent::__construct();
    }

    public function publish(HTTPRequest $request)
    {
        if ($this->record->canPublish()) {
            $this->record->publishRecursive();
            $message = $this->generateMessage('Published');
            return $this->finishHandling($request, $message);
        }
        return Security::permissionFailure($this);
    }

    public function unpublish(HTTPRequest $request)
    {
        if ($this->record->canUnpublish()) {
            $this->record->doUnpublish();
            $message = $this->generateMessage('Unpublished');
            return $this->finishHandling($request, $message);
        }
        return Security::permissionFailure($this);
    }

    public function archive(HTTPRequest $request)
    {
        if ($this->record->canArchive()) {
            $this->record->doArchive();
            $message = $this->generateMessage('Archived');
            return $this->finishHandling($request, $message);
        }
        return Security::permissionFailure($this);
    }

    protected function finishHandling($request, $message)
    {
        $this->request->addHeader('X-Status', rawurlencode($message));
        $this->gridField->getForm()->sessionMessage($message, 'good', ValidationResult::CAST_HTML);
        $controller = Controller::curr();
        if ($controller->hasMethod('getResponseNegotiator')) {
            return $controller->getResponseNegotiator()->respond($request);
        }
        return $this->redirectBack();
    }

    /**
     * Helper method to fetch a localised feedback message, defaulting to English
     * @param string $translationID "Published" | "Unpublished" | "Archived"
     * @return string Message in local translation if it exsits, or in English.
     */
    protected function generateMessage($translationID)
    {
        $link = Controller::join_links($this->gridField->Link('item'), $this->record->ID, 'edit');
        $link = '<a href="' . $link . '">"'
            . htmlspecialchars($this->record->Title, ENT_QUOTES)
            . '"</a>';
        $message = _t(
            'Symbiote\\GridFieldExtensions\\GridFieldRecordActionHandler.' . $translationID,
            "$translationID {name} {link}",
            array(
                'name' => $this->record->i18n_singular_name(),
                'link' => $link
            )
        );
        return $message;
    }
}
